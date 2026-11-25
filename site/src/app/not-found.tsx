import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <p className="text-gradient-brand text-7xl font-extrabold">404</p>
      <h1 className="mt-4 text-2xl font-bold">Сторінку не знайдено</h1>
      <p className="mt-2 text-muted-foreground">Можливо, її перенесли. Почніть з головної або каталогу спеціалістів.</p>
      <div className="mt-8 flex gap-3">
        <Button asChild><Link href="/">На головну</Link></Button>
        <Button asChild variant="outline"><Link href="/team/">Спеціалісти</Link></Button>
      </div>
    </div>
  );
}
