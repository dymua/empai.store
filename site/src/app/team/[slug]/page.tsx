import { itemPage } from "@/lib/catalog-pages";

const p = itemPage("team");
export const dynamicParams = false;
export const generateStaticParams = p.generateStaticParams;
export const generateMetadata = p.generateMetadata;
export default p.Page;
