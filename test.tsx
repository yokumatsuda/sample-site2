// app/libs/microcms.ts

const MICROCMS_MAX_LIMIT = 100;

export const getAllSlugs = cache(async (): Promise<BlogSlugItem[]> => {
  const firstData = await client.getList<BlogSlugItem>({
    endpoint: "blogs",
    queries: {
      fields: "title,slug",
      orders: "-publishDate",
      limit: MICROCMS_MAX_LIMIT,
      offset: 0,
    },
  });

  if (firstData.totalCount <= MICROCMS_MAX_LIMIT) {
    return firstData.contents;
  }

  const restOffsets = Array.from(
    {
      length: Math.ceil(firstData.totalCount / MICROCMS_MAX_LIMIT) - 1,
    },
    (_, index) => (index + 1) * MICROCMS_MAX_LIMIT,
  );

  const restData = await Promise.all(
    restOffsets.map((offset) =>
      client.getList<BlogSlugItem>({
        endpoint: "blogs",
        queries: {
          fields: "title,slug",
          orders: "-publishDate",
          limit: MICROCMS_MAX_LIMIT,
          offset,
        },
      }),
    ),
  );

  return [...firstData.contents, ...restData.flatMap((data) => data.contents)];
});
