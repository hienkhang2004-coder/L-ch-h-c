#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# deploy.sh — Lịch Học 2022KTT
# Deploy website to GitHub Pages or static hosting
# ═══════════════════════════════════════════════════════════════

set -e

# ── Colors ─────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ── Configuration ──────────────────────────────────────────────
DEPLOY_BRANCH="gh-pages"
BUILD_DIR="."
REMOTE="origin"

# ── Helper functions ───────────────────────────────────────────
log_info()  { echo -e "${BLUE}ℹ${NC}  $1"; }
log_ok()    { echo -e "${GREEN}✓${NC}  $1"; }
log_warn()  { echo -e "${YELLOW}⚠${NC}  $1"; }
log_error() { echo -e "${RED}✗${NC}  $1"; }

# ── Pre-flight checks ─────────────────────────────────────────
preflight() {
    log_info "Kiểm tra trước khi deploy..."
    
    # Check git
    if ! command -v git &> /dev/null; then
        log_error "Git chưa được cài đặt"
        exit 1
    fi
    
    # Check if in git repo
    if ! git rev-parse --is-inside-work-tree &> /dev/null; then
        log_error "Không phải git repository"
        exit 1
    fi
    
    # Check required files
    for file in index.html index.mobile.html sw.js manifest.json styles.css app.js; do
        if [ ! -f "$file" ]; then
            log_error "Thiếu file: $file"
            exit 1
        fi
    done
    
    # Check for uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        log_warn "Có thay đổi chưa commit!"
        read -p "Tiếp tục deploy? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "Hủy deploy."
            exit 0
        fi
    fi
    
    log_ok "Pre-flight OK"
}

# ── Validate HTML ──────────────────────────────────────────────
validate() {
    log_info "Kiểm tra files..."
    
    # Check file sizes
    for file in index.html styles.css app.js; do
        size=$(wc -c < "$file")
        if [ "$size" -lt 100 ]; then
            log_error "$file quá nhỏ ($size bytes) — có thể bị lỗi"
            exit 1
        fi
        log_ok "$file ($size bytes)"
    done
    
    # Check JSON validity
    if command -v python3 &> /dev/null; then
        if [ -f "data/schedule.json" ]; then
            python3 -c "import json; json.load(open('data/schedule.json'))" 2>/dev/null \
                && log_ok "data/schedule.json (valid JSON)" \
                || log_error "data/schedule.json không phải JSON hợp lệ"
        fi
        if [ -f "manifest.json" ]; then
            python3 -c "import json; json.load(open('manifest.json'))" 2>/dev/null \
                && log_ok "manifest.json (valid JSON)" \
                || log_error "manifest.json không phải JSON hợp lệ"
        fi
    fi
}

# ── Deploy to GitHub Pages ─────────────────────────────────────
deploy_ghpages() {
    log_info "Deploying to GitHub Pages ($DEPLOY_BRANCH)..."
    
    # Get current branch
    current_branch=$(git branch --show-current)
    
    # Create/update deploy branch
    if git show-ref --verify --quiet "refs/heads/$DEPLOY_BRANCH"; then
        git checkout "$DEPLOY_BRANCH"
    else
        git checkout --orphan "$DEPLOY_BRANCH"
    fi
    
    # Copy files and commit
    git add -A
    git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" --allow-empty
    
    # Push
    git push "$REMOTE" "$DEPLOY_BRANCH" --force
    
    # Return to original branch
    git checkout "$current_branch"
    
    log_ok "Deployed successfully!"
    log_info "Site: https://$(git remote get-url $REMOTE | sed 's/.*github.com[:/]\(.*\)\.git/\1/' | tr '/' '.').github.io"
}

# ── Deploy to custom server via rsync ──────────────────────────
deploy_rsync() {
    local target="$1"
    
    if [ -z "$target" ]; then
        log_error "Cần chỉ định đích: deploy.sh rsync user@host:/path"
        exit 1
    fi
    
    log_info "Syncing to $target..."
    
    rsync -avz --progress \
        --exclude='.git' \
        --exclude='scripts/' \
        --exclude='*.ps1' \
        --exclude='*.py' \
        --exclude='extract.ps1' \
        --exclude='.gitattributes' \
        ./ "$target"
    
    log_ok "Synced successfully!"
}

# ── Main ───────────────────────────────────────────────────────
main() {
    echo ""
    echo "═══════════════════════════════════════"
    echo "  🚀 Deploy — Lịch Học 2022KTT"
    echo "═══════════════════════════════════════"
    echo ""
    
    preflight
    validate
    
    case "${1:-ghpages}" in
        ghpages|gh)
            deploy_ghpages
            ;;
        rsync)
            deploy_rsync "$2"
            ;;
        validate)
            log_ok "Validation passed!"
            ;;
        *)
            echo "Cách dùng: $0 [ghpages|rsync|validate]"
            echo ""
            echo "  ghpages  — Deploy to GitHub Pages (default)"
            echo "  rsync    — Sync to server via rsync"
            echo "  validate — Chỉ kiểm tra, không deploy"
            ;;
    esac
    
    echo ""
}

main "$@"
