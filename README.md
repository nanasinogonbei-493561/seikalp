# SEIKA — 成果物コレクション

成果物を紹介する日本語のLPです。CRM-kadai、ECsite-Java、Todoapp3、TodoApp、react-todolistの5件の成果物とGitHubリンクを掲載しています。スマートフォン表示に対応しています。

アプリケーションは `site/` にあります。掲載内容は `site/app/page.tsx`、スタイルは `site/app/globals.css` で変更できます。

## 開発

Node.js 22.13以上を使用します。

```sh
cd site
npm ci
npm run dev
```

## ConoHa VPS向けのビルド

```sh
cd site
npm run build:vps
```

静的配信ファイルを `site/dist/client/` に生成します。VPSでNode.jsを常駐させる必要はありません。

## 初回公開

対象ドメインは `seikalp.nanasinogonbei.com` です。`site/deploy/seikalp.nginx.conf` に専用のNginx設定を、`site/deploy/install.sh` に初回設定スクリプトを用意しています。

VPS上の `/home/admin/seikalp-deploy/public/` に静的ファイルを配置し、同じ `seikalp-deploy/` フォルダへ設定ファイルとスクリプト、および `site/dist/deploy/seikalp-security.conf` を転送した後、次を実行します。

```sh
sudo bash /home/admin/seikalp-deploy/install.sh
```

NginxとCertbotがインストールされ、DNSがVPSを指し、80・443番ポートが利用できることが前提です。スクリプトはNginx設定を検証し、HTTPS証明書を取得してHTTPからHTTPSへリダイレクトします。証明書の連絡先メールは登録しません。

既存の `seikalp` 設定や公開フォルダを検出した場合は上書きせず停止します。初回設定用のため、更新時には使用しないでください。証明書取得に失敗した場合はHTTP設定まで適用されている可能性があるため、原因を確認してからCertbotの処理を再実行してください。

## Sites向けのビルド

```sh
cd site
npm run build
```

既存のSites向けビルド設定も保持しています。

## 公開済みVPSのセキュリティ設定更新

`npm run build:vps` は静的ファイルに加え、`site/dist/deploy/seikalp-security.conf` を生成します。CSPは各HTML内のスクリプトのSHA-256ハッシュを使用し、任意のインラインJavaScriptやevalは許可しません。HSTS、埋め込み禁止、MIME推測禁止、リファラー制御、端末機能の利用制限も設定します。HSTSはこのホストだけに適用します。

1. VPSの `/etc/nginx/sites-available/seikalp`、既存のセキュリティ設定、および `/var/www/seikalp` をバックアップします。
2. 同じビルドの `dist/client/` と `dist/deploy/seikalp-security.conf` をVPSへ転送します。後者は公開フォルダの外に配置し、`sudo install -D -m 644 seikalp-security.conf /etc/nginx/snippets/seikalp-security.conf` でインストールします。
3. 既存のNginx設定のHTTPS `server` ブロック内に次を追加します。**Certbotの証明書設定・443番ポート設定・HTTP→HTTPSリダイレクトは維持し、初回用設定で上書きしないでください。**

```nginx
server_tokens off;
autoindex off;
include /etc/nginx/snippets/seikalp-security.conf;
```

4. `location /_next/` にも同じ `include` と `try_files $uri =404;` を追加します。Nginx 1.18では `add_header` のあるlocationに親のヘッダーが継承されないため、他のlocationに `add_header` がある場合もincludeが必要です。
5. メンテナンス時間中に同じビルドの静的ファイルを `/var/www/seikalp/` に反映し、`sudo nginx -t && sudo systemctl reload nginx` を実行します。HTMLとCSPは必ず同時に更新してください。検証失敗時はバックアップへ戻します。以後のコンテンツ更新でも生成されたCSPの配置とreloadが必要です。
6. `curl -I https://seikalp.nanasinogonbei.com/`、存在しないURL、実在する `/_next/` のJSファイルでヘッダーを確認し、ブラウザーのコンソールでCSP違反がなく表示・リンク・詳細の開閉が動くことを確認します。その後、診断を再実行します。

設定の根拠: [Nginxのヘッダー継承](https://nginx.org/en/docs/http/ngx_http_headers_module.html)、[CSPのスクリプトハッシュ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src)。サーバーのOS・Nginxのセキュリティ更新状況とTLS設定はVPS側で別途確認が必要です。バージョン文字列を隠すだけでは脆弱性の修正にはなりません。

### 成果物LPのURL
https://seikalp.nanasinogonbei.com/

## 依存関係のセキュリティ更新

2026-09-22: `vinext` を `1.0.0-beta.9` から `1.0.0-beta.11` に更新しました。このプロジェクトはNext.js本体を依存に持たず、Next.js互換APIを提供するvinextを使用しています。旧ビルドはvinextのバージョンを `window.next.version` に表示していたため、診断でNext.js 1.xと誤認される原因になっていました。Vite設定で実製品を含む `vinext/1.0.0-beta.11` と表示します。これは製品識別の訂正であり、脆弱性へのパッチ適用とは別の変更です。

報告の7件のCVEはNext.jsのサーバー実装に関するものです。本リポジトリのVPS構成は静的HTML・JSをNginxで配信し、Next.jsサーバー、画像最適化API、Middlewareは起動しません。実際のVPS設定も静的配信であることを確認しました。更新後は再診断し、継続する場合は診断元へ製品識別の確認を依頼してください。

Miniflareが固定する `sharp@0.35.2` の脆弱性を避けるため、`package.json` の `overrides.miniflare.sharp` で修正版 `0.35.4` を指定しています。Miniflareの更新時に要求バージョンを確認し、修正版を含むようになったらこの指定を削除して `npm audit` と両ビルドを再確認してください。
