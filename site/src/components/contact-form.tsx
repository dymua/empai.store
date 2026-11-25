"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type State = "idle" | "sending" | "ok" | "error";

/** Надсилає заявку у Cloudflare Pages Function /api/contact → Telegram. */
export function ContactForm({ topic }: { topic?: string }) {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [presetTopic, setPresetTopic] = useState(topic ?? "");

  // Тема з адреси: /contact/?topic=Business
  useEffect(() => {
    const t = new URLSearchParams(location.search).get("topic");
    if (t) setPresetTopic(t.slice(0, 200));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: location.pathname }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (res.ok && json.ok) {
        setState("ok");
        e.currentTarget.reset();
      } else {
        setState("error");
        setMessage(json.message ?? "Не вдалося надіслати. Спробуйте пізніше.");
      }
    } catch {
      setState("error");
      setMessage("Немає з'єднання. Спробуйте пізніше.");
    }
  }

  if (state === "ok") {
    return (
      <div className="rounded-xl border bg-card p-6" role="status">
        <p className="font-semibold">Дякуємо! Заявку отримано.</p>
        <p className="mt-1 text-sm text-muted-foreground">Ми відповімо протягом робочого дня.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border bg-card p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Ім'я</Label>
          <Input id="name" name="name" required maxLength={100} autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact">Email або Telegram</Label>
          <Input id="contact" name="contact" required maxLength={200} placeholder="you@company.com / @username" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="topic">Тема</Label>
        <Input id="topic" name="topic" key={presetTopic} defaultValue={presetTopic} maxLength={200} placeholder="Пілот, Business, питання" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Повідомлення</Label>
        <Textarea id="message" name="message" required rows={5} maxLength={3000} />
      </div>
      {/* Пастка для ботів: людина це поле не бачить. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Надсилаємо…" : "Надіслати"}
        </Button>
        {state === "error" && <p className="text-sm text-destructive" role="alert">{message}</p>}
      </div>
    </form>
  );
}
