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

VPS上の `/home/admin/seikalp-deploy/public/` に静的ファイルを配置し、同じ `seikalp-deploy/` フォルダへ設定ファイルとスクリプトを転送した後、次を実行します。

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

### 成果物LPのURL
https://seikalp.nanasinogonbei.com/
