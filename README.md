## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

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

