import { jsx as _jsx } from "react/jsx-runtime";
export default function Skeletons({ count = 4 }) {
    return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: Array.from({ length: count }).map((_, i) => (_jsx("div", { className: "animate-pulse bg-gray-200 h-80 rounded-lg" }, i))) }));
}
