// app\libs\add-blur-data-url-to-posts.ts
import "server-only";

import { eyecatchLocal } from "./constants";
import { getBlurDataURL } from "./get-blur-data-url";

type Eyecatch = {
  url: string;
  width?: number;
  height?: number;
  blurDataURL?: string | null;
};

type PostWithEyecatch = {
  eyecatch?: Eyecatch | null;
};

export type PostWithBlur<T extends PostWithEyecatch> = Omit<T, "eyecatch"> & {
  eyecatch: Eyecatch;
};

export async function addBlurDataURLToPosts<T extends PostWithEyecatch>(
  posts: T[],
): Promise<PostWithBlur<T>[]> {
  return Promise.all(
    posts.map(async (post) => {
      const eyecatch = post.eyecatch ?? eyecatchLocal;
      const blurDataURL = await getBlurDataURL(eyecatch.url);

      return {
        ...post,
        eyecatch: {
          ...eyecatch,
          blurDataURL,
        },
      };
    }),
  );
}
