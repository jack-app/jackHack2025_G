# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## import

絶対パスでインポートした場合，`public`が基準となる．
相対パスでのインポートではそのソースファイルが基準となる．

# jackHack2025_G

## アプリ名
windows X (ばってん)

## 概要
ポップアップしまくるウィンドウを消していくゲーム．

## 技術構成

主な使用技術は以下である．
- JavaScript (JS)
- HTML
- CSS

ホスティングにはgithub.ioを用いる．mainブランチの`docs`下がホスティングされる．
`https://jack-app.github.io/jackHack2025_G/`にアクセスすると，デプロイした内容が表示される．

# 開発の進め方

## ブランチを切る

開発開始時に一度だけやれば良い．
```
git branch <好きなブランチ名，たとえばあなたの名前>
git switch <上で入力したブランチ名>
```

## 開発環境の用意

ローカルサーバ（自分が書いたHTMLなどをブラウザに表示するためのソフトウェアだと思ってください．）を建てる．pythonが入っていれば，
```
cd docs
python3 -m http.server
```
でシンプルなローカルサーバが立つ．index.htmlをホスティングしてくれるので，いちいちデプロイせずとも動作確認ができるようになる．
別にpythonでなくても構わない．

.htmlファイルをブラウザで開いても，内容が表示されるが，JavaScriptが実行されないので，サーバを介したホスティングが必要．

## 作業内容の共有

```
git push origin <作業中のブランチ名>
```
を行う．

## デプロイ

自分のブランチからmainへのプルリクエストを出して，上級生が内容を確認してmainにマージする．

## 動作を確認する

`https://jack-app.github.io/jackHack2025_G/`にアクセスする

# アーキテクチャ

本アプリは3画面構成である．
1. start_page
2. game_page
3. result_page
である．

# コーディング規約

## 命名規則

ケースについて: https://qiita.com/shota0616/items/4ac7a8696b3f6ccbe2bc

- cssセレクタ（idやclass）はスネークケースで書く．(aaa_bbb_cccのように，アンダーバーで単語を区切る形．大文字を使わない．)
- クラス名はパスカルケースで書く．（AaaBbbCccのように，大文字で単語を区切る形．頭文字を大文字にする．）
- メソッド名はキャメルケースで書く．(aaaBbbCccのように，大文字で単語を区切る形．頭文字は小文字にする．)
