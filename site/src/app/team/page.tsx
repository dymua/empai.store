import { catalogPage } from "@/lib/catalog-pages";

const p = catalogPage("team", "Спеціалісти", "AI-спеціалісти за ролями. Виберіть роль, додайте галузь — отримайте готового помічника у своєму середовищі.", "industries");
export const metadata = p.metadata;
export default p.Page;
