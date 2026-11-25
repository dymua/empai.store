import {
  AppWindow,
  Calculator,
  ChartLine,
  Gavel,
  Plug,
  Puzzle,
  Sparkles,
  UserSearch,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Іконки, доступні в CMS (поле icon). Щоб додати нову — імпортуйте її з
 * lucide-react і додайте в мапу та в список options у public/admin/config.yml.
 */
const ICONS: Record<string, LucideIcon> = {
  "app-window": AppWindow,
  calculator: Calculator,
  "chart-line": ChartLine,
  gavel: Gavel,
  plug: Plug,
  puzzle: Puzzle,
  sparkles: Sparkles,
  "user-search": UserSearch,
  users: Users,
};

export function Icon({ name, className }: { name?: string; className?: string }) {
  const C = (name && ICONS[name]) || Sparkles;
  return <C className={className} aria-hidden />;
}
