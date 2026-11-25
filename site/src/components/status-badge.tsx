import { Badge } from "@/components/ui/badge";
import type { Status } from "@/lib/content";

const LABEL: Record<Status, string> = { ready: "Доступно", beta: "Бета", soon: "Скоро" };

export function StatusBadge({ status, onBrand }: { status: Status; onBrand?: boolean }) {
  if (onBrand) return <Badge className="bg-white text-[#111928]">{LABEL[status]}</Badge>;
  return (
    <Badge variant={status === "ready" ? "default" : status === "beta" ? "secondary" : "outline"}>
      {LABEL[status]}
    </Badge>
  );
}
