import { itemPage } from "@/lib/catalog-pages";

const p = itemPage("apps");
export const dynamicParams = false;
export const generateStaticParams = p.generateStaticParams;
export const generateMetadata = p.generateMetadata;
export default p.Page;
