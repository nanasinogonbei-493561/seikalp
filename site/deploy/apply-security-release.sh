#!/usr/bin/env bash
set -Eeuo pipefail
[[ $EUID -eq 0 ]] || { echo 'Run with sudo bash apply-security-release.sh'; exit 1; }
cd -- "$(dirname -- "$0")"
config=/etc/nginx/sites-available/seikalp
snippet=/etc/nginx/snippets/seikalp-security.conf
cmp -s nginx-original.conf "$config" || { echo 'Nginx configuration changed; review before applying.'; exit 1; }
[[ -f public/index.html && -f seikalp-security.conf ]]
nginx -t
backup=$(mktemp -d /var/backups/seikalp-20260922-XXXXXX)
cp -a /var/www/seikalp "$backup/public"
cp -a "$config" "$backup/nginx.conf"
if [[ -f $snippet ]]; then cp -a "$snippet" "$backup/security.conf"; fi
rollback() {
  trap - ERR
  cp -a "$backup/nginx.conf" "$config"
  if [[ -f $backup/security.conf ]]; then cp -a "$backup/security.conf" "$snippet"; else rm -f "$snippet"; fi
  cp -a "$backup/public/." /var/www/seikalp/
  nginx -t && systemctl reload nginx
  echo "Update failed; restored backup: $backup" >&2
  exit 1
}
trap rollback ERR
install -D -m 644 seikalp-security.conf "$snippet"
install -m 644 nginx-updated.conf "$config"
nginx -t
# Preserve old hashed assets for browsers with an older page still open.
cp -a public/. /var/www/seikalp/
chown -R root:root /var/www/seikalp
find /var/www/seikalp -type d -exec chmod 755 {} +
find /var/www/seikalp -type f -exec chmod 644 {} +
systemctl reload nginx
trap - ERR
echo "Updated successfully. Backup: $backup"
