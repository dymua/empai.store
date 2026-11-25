import { catalogPage } from "@/lib/catalog-pages";

const p = catalogPage("mcp", "MCP-сервіси", "Під'єднують AI-асистентів до даних і дій. Працюють у Claude, ChatGPT, Cursor, VS Code.");
export const metadata = p.metadata;
export default p.Page;
