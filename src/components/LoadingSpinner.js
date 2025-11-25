import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Spinner = ({ size = "md", color = "text-yellow-500", text, }) => {
    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-10 h-10",
        lg: "w-16 h-16",
    };
    return (_jsxs("div", { className: "flex flex-col items-center justify-center gap-2", children: [_jsx("div", { className: `animate-spin rounded-full border-4 border-t-4 border-gray-200 ${color} ${sizeClasses[size]}` }), text && _jsx("span", { className: "text-gray-700 text-sm", children: text })] }));
};
export default Spinner;
