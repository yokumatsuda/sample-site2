// generateMetadata() とページ本体の両方で getPostBySlug(slug) を呼んでいる場合、同じ記事を2回取りに行っています。
// app/libs/microcms.ts 側で cache を使うと、同じレンダー内の重複取得を減らせます。
