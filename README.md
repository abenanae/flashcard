# Flash Cards PWA

Google Spreadsheet / GAS からカードを読み込む、個人用フラッシュカードPWAです。

## ファイル

- `index.html` - アプリ本体
- `manifest.webmanifest` - PWAインストール用manifest
- `sw.js` - オフラインキャッシュ用Service Worker
- `icons/` - ホーム画面用アイコン
- `GAS_CODE.gs` - Google Apps Scriptに貼るコード

## Spreadsheet形式

シート名は `cards` にしてください。

```csv
id,日本語,英語,例文
001,切羽詰まった,hard-pressed,you will be hard-pressed to find anything cheaper in this location.
002,勉強になる,enlightening,I'm glad that you found it enlightening
```

`id` は固定してください。英語や日本語を後から修正しても、同じ `id` なら既存カードとして更新されます。

## GAS設定

1. Spreadsheetを開く
2. `拡張機能` → `Apps Script`
3. `GAS_CODE.gs` の内容を貼る
4. `デプロイ` → `新しいデプロイ`
5. 種類: `ウェブアプリ`
6. 実行ユーザー: `自分`
7. アクセスできるユーザー: `全員`
8. `/exec` で終わるURLをコピー

## GitHub Pages公開

1. GitHubで新しいリポジトリを作る
2. このフォルダ内のファイルをすべてアップロード
3. Repository Settings → Pages
4. Source: Deploy from a branch
5. Branch: `main` / root
6. 表示されたURLをiPhoneのSafariで開く
7. 共有 → ホーム画面に追加

## 同期

アプリの `インポート` タブでGAS WebアプリURLを貼ってください。

直接同期が失敗する環境では、`GAS URLを開く` → 表示されたJSONをコピー → `JSON貼り付け同期` で反映してください。
