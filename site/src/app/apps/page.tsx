import { catalogPage } from "@/lib/catalog-pages";

const p = catalogPage(
  "apps",
  "Додатки",
  "Інтерактивні інструменти для Claude: калькулятори, генератори, чеклісти, дашборди. Відкриваються за посиланням у Claude — без встановлення."
);
export const metadata = p.metadata;
export default p.Page;
