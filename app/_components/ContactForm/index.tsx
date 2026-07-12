// app\_components\ContactForm\index.tsx
"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useActionState, useEffect } from "react";
import {
  createContactData,
  type ContactActionState,
} from "@/app/_actions/contact";

const initialState: ContactActionState = {
  status: "idle",
  message: "",
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    createContactData,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      sendGAEvent({ event: "contact_submit_success" });
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <p className="bg-[var(--gray-10)] p-10 text-center leading-relaxed max-sm:text-left">
        お問い合わせいただき、ありがとうございます。
        <br />
        お返事まで今しばらくお待ちください。
      </p>
    );
  }

  return (
    <form className="mx-auto max-w-[640px]" action={formAction}>
      <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:gap-0">
        <div className="flex flex-col py-2">
          <label className="text-sm font-bold" htmlFor="lastname">
            姓
          </label>
          <input
            className="mt-2 w-full border border-[var(--gray-25)] px-3 py-2 leading-normal"
            type="text"
            id="lastname"
            name="lastname"
            autoComplete="family-name"
            required
          />
        </div>

        <div className="flex flex-col py-2">
          <label className="text-sm font-bold" htmlFor="firstname">
            名
          </label>
          <input
            className="mt-2 w-full border border-[var(--gray-25)] px-3 py-2 leading-normal"
            type="text"
            id="firstname"
            name="firstname"
            autoComplete="given-name"
            required
          />
        </div>
      </div>

      <div className="flex flex-col py-2">
        <label className="text-sm font-bold" htmlFor="company">
          会社名
        </label>
        <input
          className="mt-2 w-full border border-[var(--gray-25)] px-3 py-2 leading-normal"
          type="text"
          id="company"
          name="company"
          autoComplete="organization"
          required
        />
      </div>

      <div className="flex flex-col py-2">
        <label className="text-sm font-bold" htmlFor="email">
          メールアドレス
        </label>
        <input
          className="mt-2 w-full border border-[var(--gray-25)] px-3 py-2 leading-normal"
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
        />
      </div>

      <div className="flex flex-col py-2">
        <label className="text-sm font-bold" htmlFor="message">
          お問い合わせ内容
        </label>
        <textarea
          className="mt-2 min-h-40 w-full border border-[var(--gray-25)] px-3 py-2 leading-normal"
          id="message"
          name="message"
          required
        />
      </div>

      <div className="mt-8 text-center">
        {state.status === "error" && (
          <p className="mb-4 text-sm text-red-600" aria-live="polite">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="min-w-60 bg-[var(--black)] px-8 py-4 text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "送信中..." : "送信する"}
        </button>
      </div>
    </form>
  );
}
