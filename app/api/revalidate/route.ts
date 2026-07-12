// app/api/revalidate/route.ts
import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

function verifyMicrocmsSignature(rawBody: Buffer, signature: string | null) {
  const secret = process.env.MICROCMS_WEBHOOK_SECRET;

  if (!secret || !signature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  return (
    signatureBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  );
}

function revalidateBlog() {
  // トップページに新着記事を出しているなら必要
  revalidatePath("/");

  // app/blog/layout.tsx 以下のブログ関連ページをまとめて再検証対象にする
  revalidatePath("/blog", "layout");
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SECRET_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  revalidateBlog();

  return NextResponse.json({
    revalidated: true,
    paths: ["/", "/blog"],
  });
}

export async function POST(request: NextRequest) {
  const rawBody = Buffer.from(await request.arrayBuffer());
  const signature = request.headers.get("x-microcms-signature");

  if (!verifyMicrocmsSignature(rawBody, signature)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  revalidateBlog();

  return NextResponse.json({
    revalidated: true,
    paths: ["/", "/blog"],
  });
}
