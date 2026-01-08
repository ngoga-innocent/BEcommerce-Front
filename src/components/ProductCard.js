import { jsx as _jsx } from "react/jsx-runtime";
import TechCard from "./cards/TechCard";
import FashionCard from "./cards/FashionCard";
import DefaultCard from "./cards/DefaultCard";
import { getProductStyle } from "../utils/getProductStyle";
export default function ProductCard({ product }) {
    const type = getProductStyle(product);
    if (type === "tech")
        return _jsx(TechCard, { product: product });
    if (type === "fashion")
        return _jsx(FashionCard, { product: product });
    return _jsx(DefaultCard, { product: product });
}
