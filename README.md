# Supabase Phone Auth Trial

## 環境設定

- https://supabase.com/docs/guides/auth の `Phone Auth` セクションを見ながら設定
- GitHub のコードスペースを利用する場合、 `Authentication > URL Configuration > Site URL` にて取得したドメインを設定

## Clone and run locally

- GitHub のコードスペースで立ち上げて、ポートを 3000 で動かす前提で `next.config.js` を実装している
- `.env.local` の設定を更新
- あとは https://supabase.com/docs/guides/auth/quickstarts/nextjs のとおり

  ```bash
  npm run dev
  ```

## 参考

- https://supabase.com/docs/guides/auth/quickstarts/nextjs
- https://supabase.com/docs/guides/auth/phone-login