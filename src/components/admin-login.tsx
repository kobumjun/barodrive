"use client";

import { FormEvent, useState } from "react";

export function AdminLogin() {
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const pin = formData.get("pin");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });

    if (!response.ok) {
      setMessage("비밀번호가 올바르지 않습니다.");
      return;
    }

    location.reload();
  }

  return (
    <div className="mx-auto mt-16 max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200">
      <h1 className="text-2xl font-bold">관리자 로그인</h1>
      <p className="mt-2 text-sm text-zinc-600">숫자 비밀번호를 입력하세요.</p>
      <form className="mt-5 space-y-3" onSubmit={onSubmit}>
        <input type="password" name="pin" required className="w-full rounded-xl border border-zinc-200 px-4 py-3" placeholder="관리자 PIN" />
        <button className="w-full rounded-xl bg-zinc-900 py-3 font-semibold text-white">로그인</button>
      </form>
      {message ? <p className="mt-3 text-sm text-red-600">{message}</p> : null}
    </div>
  );
}
