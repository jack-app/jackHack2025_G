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

# 処理の流れ

## JSの読み込み・実行
`https://jack-app.github.io/jackHack2025_G/`にアクセスするとまず`docs/index.html`が表示される．
`docs/index.html`は表示されると同時に`docs/index.js`を読み込む．

`docs/index.js`はその他`js`ファイルを読み込み，実行する．すなわち，`docs/index.js`はJavaScriptの開始地点である．

注: ページ間のデータのやり取りを簡潔にするため，ページの埋め込みはfetch-APIを用いて行う．
`iframe`を用いてページの埋め込みを行うとDOM要素の取得が難しくなる．

# アーキテクチャ

本アプリは3画面構成である．
1. start_page
2. game_page
3. result_page
である．

全画面に共通する処理は`page.js`にクラスとして記述されており，これを継承する形でそれぞれのページに対応するクラスが定義されている．
`Page`を継承するクラスは'見た目'の操作の抽象化に主な責務をおく．たとえば，`show`はページを表示するという操作を抽象化している．

>>> ハッカソンでやるにしては過剰かも？ ハッカソン経験があんまりないのでこの抽象化レイヤをおいてしまいましたが．

`Game`クラスはゲームの進行（開始画面・終了画面を含む）に責務を置く．

# コーディング規約

## 命名規則

ケースについて: https://qiita.com/shota0616/items/4ac7a8696b3f6ccbe2bc

- cssセレクタ（idやclass）はスネークケースで書く．(aaa_bbb_cccのように，アンダーバーで単語を区切る形．大文字を使わない．)
- クラス名はパスカルケースで書く．（AaaBbbCccのように，大文字で単語を区切る形．頭文字を大文字にする．）
- メソッド名はキャメルケースで書く．(aaaBbbCccのように，大文字で単語を区切る形．頭文字は小文字にする．)

## HTMLファイルのfetchのタイミング

ゲーム中に通信が発生すると，ゲームの進行に支障をきたす可能性があるので，fetchはすべて初期化のタイミングで行う

# コーディングのヒント

JavaScriptの処理は`https://jack-app.github.io/jackHack2025_G/`に引き上げられて行われる．
また，github.ioはdocsをルートとしてホスティングする．すなわち，`https://jack-app.github.io/jackHack2025_G/`は`docs/`に対応する．
したがって，JavaScript内で相対パスを用いるときは，常に`docs/`を起点とする．
たとえば，`docs/start_page/index.js`から`docs/start_page/background.png`を参照するときは，`./start_page/background.png`と書く．

>>> VSCodeの補完を活用できないという問題がある．
