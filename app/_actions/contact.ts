// app\_actions\contact.ts
"use server";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

function validateEmail(email: string) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

export async function createContactData(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const rawFormData = {
    lastname: String(formData.get("lastname") ?? "").trim(),
    firstname: String(formData.get("firstname") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  if (!rawFormData.lastname) {
    return { status: "error", message: "姓を入力してください" };
  }

  if (!rawFormData.firstname) {
    return { status: "error", message: "名を入力してください" };
  }

  if (!rawFormData.company) {
    return { status: "error", message: "会社名を入力してください" };
  }

  if (!rawFormData.email) {
    return { status: "error", message: "メールアドレスを入力してください" };
  }

  if (!validateEmail(rawFormData.email)) {
    return { status: "error", message: "メールアドレスの形式が誤っています" };
  }

  if (!rawFormData.message) {
    return { status: "error", message: "お問い合わせ内容を入力してください" };
  }

  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID;

  if (!portalId || !formId) {
    return {
      status: "error",
      message: "フォーム設定が不足しています",
    };
  }

  try {
    const result = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: [
            {
              objectTypeId: "0-1",
              name: "lastname",
              value: rawFormData.lastname,
            },
            {
              objectTypeId: "0-1",
              name: "firstname",
              value: rawFormData.firstname,
            },
            {
              objectTypeId: "0-1",
              name: "company",
              value: rawFormData.company,
            },
            {
              objectTypeId: "0-1",
              name: "email",
              value: rawFormData.email,
            },
            {
              objectTypeId: "0-1",
              name: "message",
              value: rawFormData.message,
            },
          ],
        }),
      },
    );

    if (!result.ok) {
      console.log(await result.text());

      return {
        status: "error",
        message: "お問い合わせの送信に失敗しました",
      };
    }

    return {
      status: "success",
      message: "お問い合わせを送信しました",
    };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "お問い合わせの送信に失敗しました",
    };
  }
}
