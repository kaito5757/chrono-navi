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
   ```bash
   cp docker/.env.example docker/.env
   cp apps/web/.env.example apps/web/.env
   cp apps/admin/.env.example apps/admin/.env
   cp packages/supabase/.env.example packages/supabase/.env
   ```

4. docker-composeを起動します。
   ```bash
   pnpm docker:up
   ```

5. マイグレーションを実行します。
   ```bash
   pnpm --filter @repo/supabase-db db:push
   ```
   or
   ```bash
   cd packages/supabase-db
   pnpm db:push
   ```

### 注意事項
- **docker-composeを停止するには**:
   ```bash
   pnpm docker:down
   ```