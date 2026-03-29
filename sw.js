// ═══════════════════════════════════════
// SERVICE WORKER — Lịch Học 2022KTT
// Network-first for HTML, Cache-first for assets
// + Periodic Background Sync & Background Sync
// ═══════════════════════════════════════

const CACHE_NAME = 'lichhoc-2022ktt-v10';

// Core assets to pre-cache on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './index.mobile.html',
  './print.html',
  './styles.css',
  './styles.mobile.css',
  './app.js',
  './app.mobile.js',
  './data/schedule.json',
  './manifest.json',
  './icon.svg',
  './icon-192x192.png',
  './icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap'
];

// Install — pre-cache core assets (graceful: skip missing files)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      console.log('[SW] Pre-caching core assets');
      for (const url of PRECACHE_ASSETS) {
        try {
          await cache.add(url);
        } catch (err) {
          console.warn('[SW] Failed to cache:', url, err.message);
        }
      }
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch strategy
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Allow Google Fonts through, skip other external origins
  if (url.origin !== self.location.origin &&
      !url.hostname.includes('fonts.googleapis.com') &&
      !url.hostname.includes('fonts.gstatic.com')) return;

  // HTML pages → Network-first (always get latest version)
  if (event.request.destination === 'document' ||
      url.pathname.endsWith('.html') ||
      url.pathname === '/' ||
      url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Assets (CSS, JS, fonts, images, SVG) → Cache-first with background refresh
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Background refresh — update cache silently
        fetch(event.request).then(response => {
          if (response.ok) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
          }
        }).catch(() => {});
        return cached;
      }
      // Not in cache — fetch from network and cache it
      return fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => new Response('', { status: 408, statusText: 'Offline' }));
    })
  );
});

// ═══════════════════════════════════════
// PERIODIC BACKGROUND SYNC
// Tự động cập nhật dữ liệu lịch học định kỳ
// để người dùng luôn thấy data mới nhất khi mở app
// ═══════════════════════════════════════
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-schedule') {
    event.waitUntil(updateScheduleCache());
  }
});

async function updateScheduleCache() {
  try {
    console.log('[SW] Periodic sync: updating schedule data...');
    const cache = await caches.open(CACHE_NAME);

    // Re-fetch main pages to get latest schedule
    const urlsToRefresh = ['./', './index.html', './index.mobile.html'];

    for (const url of urlsToRefresh) {
      try {
        const response = await fetch(url, { cache: 'no-cache' });
        if (response.ok) {
          await cache.put(url, response);
          console.log('[SW] Updated cache for:', url);
        }
      } catch (err) {
        console.warn('[SW] Periodic sync failed for:', url, err.message);
      }
    }
  } catch (err) {
    console.error('[SW] Periodic sync error:', err);
  }
}

// ═══════════════════════════════════════
// BACKGROUND SYNC
// Khi offline, lưu request lại và gửi khi có mạng
// Đảm bảo data không bị mất khi mạng yếu
// ═══════════════════════════════════════
self.addEventListener('sync', event => {
  if (event.tag === 'sync-schedule-data') {
    event.waitUntil(syncPendingRequests());
  }
});

async function syncPendingRequests() {
  try {
    console.log('[SW] Background sync: processing pending requests...');

    // Lấy pending requests từ IndexedDB (nếu app lưu data offline)
    const db = await openSyncDB();
    const tx = db.transaction('pending-requests', 'readwrite');
    const store = tx.objectStore('pending-requests');
    const requests = await getAllFromStore(store);

    for (const item of requests) {
      try {
        const response = await fetch(item.url, {
          method: item.method || 'GET',
          headers: item.headers || {},
          body: item.body || null
        });

        if (response.ok) {
          // Xóa request đã gửi thành công
          const deleteTx = db.transaction('pending-requests', 'readwrite');
          deleteTx.objectStore('pending-requests').delete(item.id);
          console.log('[SW] Synced:', item.url);
        }
      } catch (err) {
        console.warn('[SW] Sync failed, will retry:', item.url);
      }
    }
  } catch (err) {
    console.log('[SW] No pending requests or sync DB not initialized');
  }
}

// Helper: open IndexedDB for background sync
function openSyncDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('lichhoc-sync', 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore('pending-requests', { keyPath: 'id', autoIncrement: true });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Helper: get all items from object store
function getAllFromStore(store) {
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ═══════════════════════════════════════
// PUSH NOTIFICATIONS
// Nhận thông báo đẩy từ server (nhắc lịch học, thay đổi TKB)
// ═══════════════════════════════════════
self.addEventListener('push', event => {
  let data = { title: 'Lịch Học 2022KTT', body: 'Bạn có thông báo mới!' };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body || 'Bạn có thông báo mới!',
    icon: './icon-192x192.png',
    badge: './icon-192x192.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'lichhoc-notification',
    renotify: true,
    data: {
      url: data.url || './index.html'
    },
    actions: [
      { action: 'open', title: 'Xem lịch học' },
      { action: 'dismiss', title: 'Bỏ qua' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Lịch Học 2022KTT', options)
  );
});

// Xử lý khi user bấm vào notification
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const targetUrl = event.notification.data?.url || './index.html';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // Nếu app đã mở → focus vào cửa sổ đó
      for (const client of windowClients) {
        if (client.url.includes('22kttcalender.space') && 'focus' in client) {
          return client.focus();
        }
      }
      // Nếu chưa mở → mở cửa sổ mới
      return clients.openWindow(targetUrl);
    })
  );
});
