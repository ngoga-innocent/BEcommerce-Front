import TechCard from "./cards/TechCard";
import FashionCard from "./cards/FashionCard";
import DefaultCard from "./cards/DefaultCard";
import { getProductStyle } from "../utils/getProductStyle";
import type { Product } from "../types/Product";
export default function ProductCard({product}: { product: Product }) {
  const type = getProductStyle(product);

  if (type === "tech") return <TechCard product={product} />;
  if (type === "fashion") return <FashionCard product={product} />;
  return <DefaultCard product={product} />;
}
