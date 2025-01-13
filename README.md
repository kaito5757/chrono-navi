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

### Docker関連
#### ▼ docker-compose停止方法
   ```bash
   pnpm docker:down
   ```

### Turborepo packages関連

#### ▼ 内部（ライブラリ）パッケージのベストプラクティス
- パッケージごとに1つの「目的」を持つようにする（複数の「目的」を持たない）
   - 理解しやすくなる
   - パッケージごとの依存関係の削減
- **参考**
   - [パッケージの種類](https://turbo.build/repo/docs/core-concepts/package-types)

#### ▼ 依存関係のインストールに関するベストプラクティス
- 依存関係が使用される場所にインストールする
   - 明確さの向上
   - 柔軟性の向上
   - キャッシュ機能の向上
   - 未使用の依存関係の削除
- 各パッケージの依存関係を追加方法
   - dependenciesに追加
      ```bash
      pnpm install jest --recursive --filter=web --filter=@repo/ui
      ```
   - devDependenciesに追加
      ```bash
      pnpm install jest --save-dev --recursive --filter=web --filter=@repo/ui
      ```