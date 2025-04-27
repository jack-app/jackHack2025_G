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

ホスティングにはgithub.ioを用いる．

# 処理の流れ

## JSの読み込み・実行
`https://jack-app.github.io/jackHack2025_G/`にアクセスするとまず`docs/index.html`が表示される．
`docs/index.html`は表示されると同時に`docs/index.js`を読み込む．

`docs/index.js`は

注: ページ間のデータのやり取りを簡潔にするため，ページの埋め込みはfetch-APIを用いて行う．
`iframe`を用いてページの埋め込みを行うとDOM要素の取得が難しくなる．

# アーキテクチャ

