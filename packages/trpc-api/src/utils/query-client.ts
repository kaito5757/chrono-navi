import {
  QueryClient,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import superjson from "superjson";

export function makeQueryClient() {
  // データ取得とキャッシュの設定
  return new QueryClient({
    defaultOptions: {
      queries: {
        // キャッシュの有効期限
        staleTime: 30 * 1000,
      },
      // NOTE: https://tanstack.com/query/latest/docs/framework/react/reference/hydration#dehydrate
      dehydrate: {
        // シリアライズに使用する関数
        serializeData: superjson.serialize,
        // クエリをデシリアライズするかどうかを判断する関数
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      // NOTE: https://tanstack.com/query/latest/docs/framework/react/reference/hydration#hydrate
      hydrate: {
        // デシリアライズに使用する関数
        deserializeData: superjson.deserialize,
      },
    },
  });
}
