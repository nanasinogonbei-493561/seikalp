#!/usr/bin/env bash
# Prepare the official stable repository and simulate migration. No package install.
set -euo pipefail
test "$(id -u)" -eq 0 || { echo 'Run with sudo bash.'; exit 1; }
. /etc/os-release
test "$ID:$VERSION_CODENAME" = ubuntu:jammy || { echo 'Expected Ubuntu jammy'; exit 1; }
command -v curl >/dev/null
command -v gpg >/dev/null
nginx -t
backup=$(mktemp -d /root/nginx-upgrade-backup.XXXXXXXX)
chmod 700 "$backup"
cp -a /etc/nginx "$backup/nginx"
cp -a /etc/apt "$backup/apt"
dpkg-query -W > "$backup/packages.txt"
nginx -T > "$backup/nginx-expanded.txt" 2>&1
echo "Backup: $backup"
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
curl --fail --silent --show-error --proto '=https' https://nginx.org/keys/nginx_signing.key -o "$work/key.asc"
gpg --batch --show-keys --with-colons "$work/key.asc" > "$work/fingerprints"
awk -F: '$1 == "fpr" && $10 == "573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62" {found=1} END {exit !found}' "$work/fingerprints"
gpg --batch --dearmor --output "$work/key.gpg" "$work/key.asc"
install -m 644 "$work/key.gpg" /usr/share/keyrings/seikalp-nginx-archive-keyring.gpg
printf '%s\n' 'deb [signed-by=/usr/share/keyrings/seikalp-nginx-archive-keyring.gpg] https://nginx.org/packages/ubuntu jammy nginx' > /etc/apt/sources.list.d/seikalp-nginx.list
printf '%s\n' 'Package: nginx nginx-module-*' 'Pin: origin nginx.org' 'Pin-Priority: 900' > /etc/apt/preferences.d/seikalp-nginx
apt-get update
apt-cache policy nginx
apt-get --simulate install nginx
echo 'Preparation complete. No packages installed and no services restarted.'
echo 'Review removals, dynamic modules, and configuration before installing.'
