export function getProductStyle(product) {
    const title = product?.title?.toLowerCase() || "";
    const techKeywords = ["laptop", "phone", "computer", "pc", "camera", "tv", "charger", "smart"];
    const fashionKeywords = ["shoe", "shirt", "dress", "bag", "fashion", "cloth", "style", "wear"];
    if (techKeywords.some(k => title.includes(k)))
        return "tech";
    if (fashionKeywords.some(k => title.includes(k)))
        return "fashion";
    if (product.price > 200000)
        return "tech"; // high-value → clean minimal
    if (product.price < 20000)
        return "fashion"; // low/mid → aesthetic colorful
    return "default";
}
