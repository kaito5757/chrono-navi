# CHRONO-NAVI

## サイト
- [CHRONO-NAVI](https://chrono-navi-web.pages.dev)
- [CHRONO-NAVI(管理画面)](https://chrono-navi-admin.pages.dev)

## セットアップ
### 前提
- pnpmインストール済み（ドキュメント: https://pnpm.io/ja/installation ）
- dockerインストール&起動済み（ドキュメント: https://docs.docker.com/get-docker/ ）
  - 推奨: orbstack（ドキュメント: https://orbstack.dev/download ）

### 手順
1. リポジトリをクローンします。
   ```bash
   git clone https://github.com/kaito5757/chrono-navi.git
   ```

2. パッケージをインストールします。
   ```bash
   pnpm i
   ```

3. 環境変数を設定します。
   - next-env
   ```bash
   cp .env.example .env
   ```

   - docker-env
   ```bash
   cd docker
   cp .env.example .env
   ```

4. ビルドします。
   ```bash
   pnpm build
   ```

5. docker-composeを起動します。
   ```bash
   pnpm docker:up
   ```

### 注意事項
- **docker-composeを停止するには**:
   ```bash
   pnpm docker:down
   ```