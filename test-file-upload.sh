
#!/usr/bin/env bash
# File Upload Test Script for Linux/macOS using curl
#
# Usage:
#   API_KEY=your_api_key ./test-file-upload.sh
#   # or, place your API_KEY and other secrets in .env.local
#
# This script will automatically source .env.local if present.

set -euo pipefail

# Load environment variables from .env.local if it exists
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

# Configuration
API_KEY="${API_KEY:-weco_live_5ce8e5719eb69662ca51bcc527283d8e9f72c26cfca6141d}"
BASE_URL="http://localhost:3000"

# Colors
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
GRAY='\033[1;30m'
NC='\033[0m'

function info() { echo -e "${YELLOW}$1${NC}"; }
function ok() { echo -e "${GREEN}$1${NC}"; }
function fail() { echo -e "${RED}$1${NC}"; }
function debug() { echo -e "${GRAY}$1${NC}"; }

TMP_IMG="$(mktemp --suffix=.png)"
TMP_JSON="$(mktemp --suffix=.json)"

# 1. Copy a local public image to a temp file
info "1. Copying local test image..."
cp ./public/placeholder-logo.png "$TMP_IMG"
ok "   - Image copied to $TMP_IMG"

# 1.5. Get current authenticated user ID
info "\n1.5. Fetching current user ID..."
ME_JSON=$(curl -sS -H "Authorization: Bearer $API_KEY" "$BASE_URL/api/me")
USER_ID=$(echo "$ME_JSON" | jq -r .data.id)
if [[ "$USER_ID" == "null" || -z "$USER_ID" ]]; then
  fail "   x Failed to fetch current user"
  exit 1
fi
ok "   - Current User ID: $USER_ID"

# 2. Create a project
info "\n2. Creating project..."
PROJECT_NAME="Upload Test $(date '+%Y-%m-%d %H:%M:%S')"
echo -n "{\"name\": \"$PROJECT_NAME\", \"description\": \"Testing file uploads\"}" > "$TMP_JSON"
PROJECT_JSON=$(curl -sS -X POST -H "Authorization: Bearer $API_KEY" -H "Content-Type: application/json" -d @"$TMP_JSON" "$BASE_URL/api/projects")
PROJECT_ID=$(echo "$PROJECT_JSON" | jq -r .data.id)
if [[ "$PROJECT_ID" == "null" || -z "$PROJECT_ID" ]]; then
  fail "   x Project creation failed"
  exit 1
fi
ok "   - Project created: $PROJECT_NAME (ID: $PROJECT_ID)"

# 3. Create issue with screenshot
info "\n3. Creating issue with screenshot..."
ISSUE_JSON=$(curl -sS -X POST -H "Authorization: Bearer $API_KEY" \
  -F "title=Bug with Screenshot" \
  -F "description=Testing screenshot upload via API" \
  -F "status=open" \
  -F "priority=high" \
  -F "screenshot=@$TMP_IMG" \
  "$BASE_URL/api/projects/$PROJECT_ID/issues")
ISSUE_ID=$(echo "$ISSUE_JSON" | jq -r .data.id)
if [[ "$ISSUE_ID" == "null" || -z "$ISSUE_ID" ]]; then
  fail "   x Issue creation failed"
  exit 1
fi
ok "   - Issue created (ID: $ISSUE_ID)"
debug "   - Screenshot URL: $(echo "$ISSUE_JSON" | jq -r .data.screenshot_url)"

# 4. Add comment with attachment
info "\n4. Adding comment with attachment..."
COMMENT_JSON=$(curl -sS -X POST -H "Authorization: Bearer $API_KEY" \
  -F "content=Additional context with attachment" \
  -F "user_id=$USER_ID" \
  -F "attachment=@$TMP_IMG" \
  "$BASE_URL/api/issues/$ISSUE_ID/comments")
COMMENT_ID=$(echo "$COMMENT_JSON" | jq -r .data.id)
if [[ "$COMMENT_ID" == "null" || -z "$COMMENT_ID" ]]; then
  fail "   x Comment creation failed"
  exit 1
fi
ok "   - Comment created"
debug "   - Attachment URL: $(echo "$COMMENT_JSON" | jq -r .data.attachment_url)"
debug "   - Attachment Type: $(echo "$COMMENT_JSON" | jq -r .data.attachment_type)"

# 5. Verify uploads
info "\n5. Verifying uploads..."
ISSUE_CHECK=$(curl -sS -H "Authorization: Bearer $API_KEY" "$BASE_URL/api/issues/$ISSUE_ID")
COMMENTS_CHECK=$(curl -sS -H "Authorization: Bearer $API_KEY" "$BASE_URL/api/issues/$ISSUE_ID/comments")
if [[ $(echo "$ISSUE_CHECK" | jq -r .data.screenshot_url) != "null" ]]; then
  ok "   - Issue screenshot present: Yes"
else
  fail "   - Issue screenshot present: No"
fi
ok "   - Number of comments: $(echo "$COMMENTS_CHECK" | jq -r .data | jq length)"

# Cleanup
test -f "$TMP_IMG" && rm "$TMP_IMG"
test -f "$TMP_JSON" && rm "$TMP_JSON"

info "\n=== Test Complete ==="
