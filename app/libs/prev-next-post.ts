// app\libs\prev-next-post.ts
export type PrevNextPostItem = {
  title: string;
  slug: string;
};

export function prevNextPost<T extends PrevNextPostItem>(
  allSlugs: T[],
  currentSlug: string,
): [T | null, T | null] {
  const index = allSlugs.findIndex(({ slug }) => slug === currentSlug);

  if (index === -1) {
    return [null, null];
  }

  const prevPost = allSlugs[index + 1] ?? null;
  const nextPost = allSlugs[index - 1] ?? null;

  return [prevPost, nextPost];
}
