import { jsx as _jsx } from "react/jsx-runtime";
export default function ProductGrid({ children }) {
    return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: children }));
}
