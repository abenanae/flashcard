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

## 更新が反映されない場合

通常モードだけ古い画面が出る場合は、PWAのService Workerキャッシュが残っています。
最新版ではアプリ本体はネットワーク優先で取得しますが、古いService Workerが残っている端末では一度だけ再読み込み、またはブラウザのサイトデータ削除が必要な場合があります。

## Google Drive同期

カード、学習状態、学習履歴、達成日、画像はGoogle Driveのアプリデータ領域（`appDataFolder`）に1つのJSONファイルとして同期できます。
同期ファイルはDriveの通常画面には表示されず、このPWAだけが読み書きします。

### Google Cloud設定

1. Google Cloud Consoleでプロジェクトを作成
2. Google Drive APIを有効化
3. OAuth同意画面を設定
   公開ステータスがテスト中の場合は、自分のGoogleアカウントをテストユーザーに追加
4. 認証情報 → OAuth クライアントIDを作成
5. アプリケーションの種類: `ウェブ アプリケーション`
6. 承認済みのJavaScript生成元にGitHub PagesのURLを追加
   例: `https://<user>.github.io`
7. ローカルで試す場合は `http://localhost:8000` なども追加
8. 作成されたクライアントIDをアプリの `インポート` → `Google Drive 同期` に貼り付ける

必要なスコープは `https://www.googleapis.com/auth/drive.appdata` です。

### 使い方

1. 1台目の端末で `設定して連携`
2. 連携直後に自動で安全同期される
3. 2台目の端末で同じOAuthクライアントIDを設定
4. `設定して連携`
5. 必要なときだけ `今すぐ安全同期`

`今すぐ安全同期` はDrive上のデータと端末内のデータをマージしてからDriveへ保存します。
Driveを読まずに端末内データだけを上書きアップロードする操作はありません。
削除も同期するため、カード削除や全データ削除は他端末にも反映されます。

### 自動同期の制約

PWA単体ではGoogleの長期更新トークンを安全に保持しないため、アプリを開き直した後は再度 `設定して連携` が必要になる場合があります。
連携済みでアクセストークンが有効な間は、学習・編集・画像変更・削除後に自動で安全同期します。
アプリを閉じている間のバックグラウンド同期はできません。

## Spreadsheet同期

アプリの `インポート` タブでGAS WebアプリURLを貼ってください。

直接同期が失敗する環境では、`GAS URLを開く` → 表示されたJSONをコピー → `JSON貼り付け同期` で反映してください。
