# chat_app_frontend

## 概要
Webアプリケーション開発課題(Botとのチャットアプリケーション)のフロントエンドの実装です。  
以下のフレームワークを使用しています。
- node.js (v12.19.0)
- react.js (v16.13.1)

## 前提条件
事前にバックエンドサーバの環境構築が必要です。
- chat_app_backend  
https://github.com/ktana2526/chat_app_backend

## 実行方法
ローカル環境へのインストールおよび起動方法は以下の通りです。

1. 任意のフォルダにプロジェクトを展開します。
```
$ git clone https://github.com/ktana2526/chat_app_frontend
$ chat_app_frontend
```

2. 必要なパッケージをインストールします。(npm install)
```
$ npm install
```

3. 環境変数の設定ファイル(.env)を設定します。
chat_app_frontend フォルダの直下に.envファイルを作成してください。
```
# バックエンドサーバのURL(プロトコル + FQDN)
REACT_APP_BACKEND_SERVER=http://localhost:5000
```

4. アプリケーションを起動します。
```
$ npm start
```

## 画面仕様
フロントエンド側からバックエンドサーバーの各種APIにアクセスします。  

![画面イメージ](https://github.com/ktana2526/chat_app_frontend/blob/master/img/description.png)

#### 送信 ボタン
1. テキストフィールドに入力された値をサーバに送信します。

##### URL

```
POST /chat
```
##### Request
```
{
  "user_input": "こんにちは" // テキストボックスに入力した文字列
}
```
2. ユーザーの入力およびBotの応答を画面に表示します。
```
11:22:54 You > こんにちは
11:22:55 Bot > こんにちは。
```


#### クリア ボタン
画面に表示されたユーザーの入力およびBotの応答を削除します。


#### 履歴取得 ボタン
1. サーバに履歴の取得要求を送信します。

##### URL

```
GET /history/list
```

2. 取得した履歴(最新の10件)を画面に表示します。

```
12:09:41 You(history) > 今何時？
12:09:41 Bot(history) > 0時9分です。
12:09:34 You(history) > こんにちは
12:09:34 Bot(history) > こんにちは。
…
```

#### 履歴削除 ボタン
1. サーバに履歴の削除要求を送信します。

##### URL

```
GET /history/delete
```

2. 削除した履歴の件数を画面に表示します。
```
12:10:19 Ope > 履歴を削除しました。(2件)
```
