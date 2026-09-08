#!/usr/bin/env bash
set -euo pipefail
if [ "$(id -u)" -ne 0 ]; then
    echo 'Run with sudo: sudo bash /home/admin/seikalp-deploy/install.sh'
    exit 1
fi
source_dir=/home/admin/seikalp-deploy
available=/etc/nginx/sites-available/seikalp
 enabled=/etc/nginx/sites-enabled/seikalp
if [ -e "$available" ] || [ -L "$enabled" ] || [ -e /var/www/seikalp ]; then
    echo 'Existing seikalp files detected. Stopping to avoid overwriting them.'
    exit 1
fi
test -s "$source_dir/public/index.html"
nginx -t
install -d -m 755 /var/www/seikalp
cp -R "$source_dir/public/." /var/www/seikalp/
chown -R root:root /var/www/seikalp
find /var/www/seikalp -type d -exec chmod 755 {} +
find /var/www/seikalp -type f -exec chmod 644 {} +
install -m 644 "$source_dir/seikalp.nginx.conf" "$available"
ln -s "$available" "$enabled"
if ! nginx -t; then
    unlink "$enabled"
    echo 'New configuration disabled because validation failed.'
    exit 1
fi
systemctl reload nginx
certbot --nginx --non-interactive --agree-tos --register-unsafely-without-email --redirect -d seikalp.nanasinogonbei.com
nginx -t
curl --fail --silent --show-error -o /dev/null https://seikalp.nanasinogonbei.com/
echo 'Published: https://seikalp.nanasinogonbei.com/'
