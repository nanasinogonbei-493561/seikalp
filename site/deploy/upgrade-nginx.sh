#!/usr/bin/env bash
# Migrate the inspected Ubuntu Jammy VPS to nginx.org stable, preserving sites.
set -euo pipefail
test "$(id -u)" -eq 0 || { echo 'Run with sudo bash.'; exit 1; }
. /etc/os-release
test "$ID:$VERSION_CODENAME" = ubuntu:jammy
target='1.30.5-1~jammy'
test "$(dpkg-query -W -f='${Version}' nginx)" = '1.18.0-6ubuntu14.21'
test ! -e /usr/sbin/policy-rc.d && test ! -L /usr/sbin/policy-rc.d || {
  echo 'Existing service policy detected; review manually.'; exit 1;
}
nginx -t
systemctl is-active --quiet nginx
backup=$(mktemp -d /root/nginx-migration.XXXXXXXX)
chmod 700 "$backup"
cp -a /etc/nginx "$backup/nginx"
nginx -T > "$backup/config-before.txt" 2>&1
dpkg-query -W > "$backup/packages-before.txt"
mkdir "$backup/old-packages" "$backup/new-package"
echo "Backup and recovery files: $backup"
packages=(nginx nginx-common nginx-core libnginx-mod-http-geoip2 libnginx-mod-http-image-filter libnginx-mod-http-xslt-filter libnginx-mod-mail libnginx-mod-stream libnginx-mod-stream-geoip2)
for package in "${packages[@]}"; do
  version=$(dpkg-query -W -f='${Version}' "$package")
  (cd "$backup/old-packages" && apt-get download "$package=$version")
done
(cd "$backup/new-package" && apt-get download "nginx=$target")
dpkg-deb -x "$backup"/new-package/nginx_*.deb "$backup/extracted"
apt-get --simulate install "nginx=$target" > "$backup/apt-plan.txt"
cat "$backup/apt-plan.txt"
# Stop if the package manager proposes removing anything beyond the reviewed set.
while read -r package; do
  case "$package" in
    nginx-common|nginx-core|libnginx-mod-http-geoip2|libnginx-mod-http-image-filter|libnginx-mod-http-xslt-filter|libnginx-mod-mail|libnginx-mod-stream|libnginx-mod-stream-geoip2) ;;
    *) echo "Unexpected removal: $package"; exit 1 ;;
  esac
done < <(awk '$1 == "Remv" {print $2}' "$backup/apt-plan.txt")
# The new binary validates every existing include and certificate before mutation.
python3 - "$backup" <<'PY'
from pathlib import Path
import sys
root = Path(sys.argv[1])
text = (root / 'nginx/nginx.conf').read_text()
line = 'include /etc/nginx/modules-enabled/*.conf;'
assert text.count(line) == 1, 'Unexpected module loader configuration'
text = text.replace(line, '# Ubuntu dynamic modules removed during official-package migration.')
# Preserve Ubuntu's existing writable temporary directories. The extracted
# official binary's default /var/cache/nginx is not created until installation.
paths = {
    'client_body_temp_path': '/var/lib/nginx/body',
    'proxy_temp_path': '/var/lib/nginx/proxy',
    'fastcgi_temp_path': '/var/lib/nginx/fastcgi',
    'uwsgi_temp_path': '/var/lib/nginx/uwsgi',
    'scgi_temp_path': '/var/lib/nginx/scgi',
}
assert text.count('http {') == 1, 'Unexpected http configuration'
directives = ''.join(f'    {name} {path};\n' for name, path in paths.items())
text = text.replace('http {', 'http {\n' + directives, 1)
(root / 'candidate.conf').write_text(text)
PY
# Relative includes use the directory containing -c, not the binary prefix.
# A dotfile here is outside conf.d/*.conf and sites-enabled/*, so the running
# server cannot accidentally load this validation-only configuration.
validation_config=$(mktemp /etc/nginx/.seikalp-validation.XXXXXXXX)
trap 'rm -f "$validation_config"' EXIT
install -m 600 "$backup/candidate.conf" "$validation_config"
"$backup/extracted/usr/sbin/nginx" -t -c "$validation_config"
rm -f "$validation_config"
trap - EXIT
# Recovery command uses the saved packages, not whichever versions repositories offer later.
cat > "$backup/restore.sh" <<'SH'
#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")"
export DEBIAN_FRONTEND=noninteractive
apt-get -y --allow-downgrades -o Dpkg::Options::=--force-confold install ./old-packages/*.deb
mv /etc/nginx "nginx-before-restore-$(date +%s)"
cp -a nginx /etc/nginx
systemctl daemon-reload
nginx -t
systemctl restart nginx
SH
chmod 700 "$backup/restore.sh"
# Suppress package maintainer stop/start actions until all configs are restored.
printf '#!/bin/sh\nexit 101\n' > /usr/sbin/policy-rc.d
chmod 755 /usr/sbin/policy-rc.d
cleanup() { rm -f /usr/sbin/policy-rc.d; }
trap cleanup EXIT
on_error() {
  trap - ERR
  echo "Migration failed. Attempting rollback from $backup"
  if bash "$backup/restore.sh"; then
    echo 'Old Nginx restored.'
  else
    echo "Rollback needs attention: sudo bash $backup/restore.sh"
  fi
  exit 1
}
trap on_error ERR
export DEBIAN_FRONTEND=noninteractive
apt-get -y -o Dpkg::Options::=--force-confold install "nginx=$target"
mv /etc/nginx "$backup/package-nginx"
cp -a "$backup/nginx" /etc/nginx
install -m 644 "$backup/candidate.conf" /etc/nginx/nginx.conf
nginx -t
cleanup
trap - EXIT
systemctl daemon-reload
systemctl restart nginx
systemctl is-active --quiet nginx
nginx -v
for host in seikalp.nanasinogonbei.com kojinlp.nanasinogonbei.com crm-kadai.top; do
  curl --fail --silent --show-error --max-time 15 --resolve "$host:443:127.0.0.1" -o /dev/null "https://$host/"
done
curl --fail --silent --show-error --max-time 15 -o /dev/null http://127.0.0.1:8090/
trap - ERR
echo "Nginx migration completed. Backup: $backup"
