## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## 開発環境

`npm`のかわりに`pnpm`を使用しているのでインストールします。

```sh
$ npm install -g pnpm
```

本アプリで使用しているライブラリをインストールします。

```sh
$ pnpm dev
```

## 実行方法

1. ターミナルから開発サーバを起動します。

    ```sh
    $ pnpm dev
    ```

1. http://localhost:3000 にアクセスします。

補足：

`pnpm dev`は、`package.json`の`scripts/dev`に記載されているコマンドを実行しています。

### デバッグ方法

1. Visual Studio Codeの「実行とデバッグ」に移動します。

1. `Next.js: debug full stack`を選択し、実行ボタンをクリックします。

補足：

デバッグ実行定義は`.vscode/launch.json`に記載しています。  
（[Debugging with VS Code](https://nextjs.org/docs/pages/building-your-application/configuring/debugging#debugging-with-vs-code)から引用）

## トラブルシューティング

### 第6章「データベースの設定」でVercelにデプロイするとエラーとなる

```
You did not supply a 'connectionString' and no 'POSTGRES_URL' env var was found.
```

原因：

環境変数がVercelプロジェクトに定義されていないため。

対策；

一旦エラーは無視して次の手順[Create a Postgres database](https://nextjs.org/learn/dashboard-app/setting-up-your-database#create-a-postgres-database)を行い、データベースを作成します。

続けて第6章の最後まで実施し、ローカル実行（`pnpm run dev`）でVercel上のPostgreSQLにアクセスできることを確認します。

Vercelへのデプロイに戻ります。ポイントは、ローカルの`./.env`に定義した環境変数をVercelにインポートしたのちにデプロイすることです。

環境変数のインポート手順は以下の通りです。

1. Vercelのプロジェクトを開き、「Settinge」タブに移動する。
1. 左側の「Environment Variables」をクリックする。
1. `Import.emv`ボタンをクリックし、`./.emv`ファイルを選択する。

Vercelへの再デプロイ方法は以下の通りです。

1. 「Deployments」タブに移動します。
1. 一覧からErrorとなっている行の3点リーダをクリックし、「Redeploy」をクリックします。

以上でデプロイが成功します。

