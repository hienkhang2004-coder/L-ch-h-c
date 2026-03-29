# 📚 Dự án Lịch Học Sinh Viên (PWA)

Đây là ứng dụng Web Hỗ Trợ Xem Lịch Học dành cho sinh viên, được thiết kế dưới dạng Progressive Web App (PWA) giúp bạn có thể cài đặt trực tiếp lên Máy tính hoặc Điện thoại và sử dụng Offline. Đầu vào dữ liệu có thể được phân tích tự động bằng trí tuệ nhân tạo (Google Gemini AI).

## ✨ Tính năng nổi bật
1. **Giao diện hiện đại & Đa nền tảng:** Có hai phiên bản riêng biệt cho Máy tính (Desktop) và Điện thoại (Mobile) với trải nghiệm mượt mà, hỗ trợ Dark Mode.
2. **Nhập lịch thông minh (AI Import):** Không cần gõ tay! Chụp màn hình Lịch học tại trang web của trường và dán vào, AI sẽ tự động phân tích và xếp lịch.
3. **PWA - Cài đặt như App Native:**
   - Trình duyệt sẽ gợi ý cài đặt ứng dụng.
   - Hỗ trợ chế độ Offline (không cần kết nối Mạng vẫn xem được TKB).
4. **Nhắc nhở qua Push Notification:** Đồng hồ sẽ đổ chuông / gửi thông báo nổi trước 15 phút khi bắt đầu môn học.
5. **In ấn A4 Cực Nét:** Tích hợp bộ dàn trang Bảng HTML Table, hỗ trợ in ra giấy chuẩn khổ ngang A4 mà không bị vỡ vạch.
6. **Bảo mật tuyệt đối:** API Key của AI và Mọi dữ liệu cá nhân chỉ lưu trực tiếp trên bộ nhớ Trình duyệt thiết bị (LocalStorage). KHÔNG TẢI LÊN MẠNG.

## 🛠️ Trải nghiệm / Chạy thử
1. Mở thẳng file `index.html` (Bản máy tính) hoặc `index.mobile.html` (Bản điện thoại) trong trình duyệt Chrome / Edge / Firefox. Không cần cài cắm server phức tạp.
2. Truy cập [Google AI Studio](https://aistudio.google.com/app/apikey) để lấy một chìa khoá API (API Key) miễn phí riêng của bạn.
3. Bấm **AI Nhập lịch mới** (hoặc Nút màu tím góc phải), dán Key và Ảnh vào, phần còn lại hãy để máy lo!

## 🔐 Bảo mật dữ liệu
- Dự án là một trang web 100% Client-side.
- Bạn có thể tùy thích **Xóa & Khôi phục TKB gốc** bất kỳ lúc nào nếu muốn. API key sẽ bị giữ lại ở máy tính của bạn và dùng tiếp vào lần tới.

---

## 📜 Lịch sử Nâng cấp Hệ thống (Từ v1.0 – v9.0)

*(Mốc thời gian quy đổi chuẩn theo tiến trình Pair-Programming)*

🚀 **[v1.0] - Khởi đầu (Nền Móng HAU)**
*   [Update: Ngày 24/03/2026] Khởi tạo bộ móng HTML, CSS, JS tĩnh hiển thị bảng thời khóa biểu cơ bản. Cấu trúc lưới ô vuông truyền thống, chỉ hoạt động trên PC.

🌙 **[v2.0] - Giao Diện Di động & Dark Mode**
*   [Update: Ngày 25/03/2026] Phát hành phiên bản `index.mobile.html`, tối ưu hóa thao tác chạm, vuốt điện thoại. Tích hợp Dark Mode bảo vệ mắt ban đêm.

📱 **[v3.0] - PWA & Trải nghiệm Offline**
*   [Update: Ngày 27/03/2026] Tiêm Service Worker (`sw.js`). Biến Web thành ứng dụng Native có thể cài lên màn hình chính. Xem lịch Offline 100% không cần mạng.

📅 **[v4.0] - Xuất Tệp iCal (.ICS)**
*   [Update: Chiều 28/03/2026] Xây dựng trình biên dịch JSON sang `.ics`. Hỗ trợ đồng bộ tự động một chạm với Google Calendar và thiết bị Apple.

🤖 **[v5.0] - Kỷ nguyên Trí tuệ Nhân tạo (Gemini AI)**
*   [Update: Sáng 29/03/2026] Dẹp bỏ gõ lịch bằng tay. Khởi tạo tính năng cho AI tự dùng thị giác máy tính đọc Ảnh Chụp/Tờ rơi TKB và đẩy vào khung dữ liệu.

🔒 **[v6.0] - Bảo Mật Khóa API (Chống Leak)**
*   [Update Cố định: Chiều 29/03/2026] Phát hiện khóa cũ bị lộ, dỡ bỏ mã Key cứng. Đưa vào cơ chế `LocalStorage` cho phép mã hóa giao thức bảo mật cá nhân, giữ Web an toàn khi Upload lên mạng.

🖨️ **[v7.0] - Dàn trang In Ẩn A4 (Print.html)**
*   [Update: Thời điểm 18:40 - 29/03/2026] Tạo trang phụ `print.html` tối ưu CSS khổ giấy A4 để sinh viên có thể mang ra quán Photocopy mà không vỡ bảng. Áp dụng Offline Service Worker cho luôn bản in.

🛠️ **[v8.0] - Tối Ưu UX & Xóa Lịch Rác**
*   [Update: Thời điểm 18:50 - 29/03/2026] Việt hóa ngôn ngữ cảnh báo lỗi mạng 429/404 của Google sang Tiếng Việt. Gắn nút "Khôi phục TKB Gốc" cho phép Reset hệ thống 1 chạm.

🗺️ **[v9.0] - Bản đồ Vector Tương Tác HAU**
*   [Update: Thời điểm 19:10 - 29/03/2026] Không dùng ảnh tĩnh tải Web nặng. Vẽ hoàn toàn khối Đồ họa SVG cho Trường Đại học Kiến trúc. Khi nhấp vào Lớp Học (Ví dụ: `M-M 7.02`), App kích hoạt CSS tự động tỏa sáng vòng quanh khối nhà Tòa Nhà (Nhà Mỹ Thuật, Tòa H Mới, Nhà E...) để tân sinh viên dò tìm phòng.

`Cảm ơn bạn đã đồng hành và xây dựng sản phẩm này!`
