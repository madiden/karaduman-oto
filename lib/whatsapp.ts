/**
 * WhatsApp linkindeki text parametresini encode eder.
 * Kullanıcı admin panelden düz metin girebilir, biz URL-safe hale getiririz.
 */
export function encodeWhatsAppLink(url: string): string {
    if (!url) return "";

    try {
        const urlObj = new URL(url);
        const text = urlObj.searchParams.get("text");
        if (text) {
            urlObj.searchParams.set("text", text);
        }
        return urlObj.toString();
    } catch {
        // URL parse edilemezse olduğu gibi döndür
        return url;
    }
}
