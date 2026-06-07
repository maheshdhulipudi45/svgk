export const WHATSAPP_NUMBER = "917658956116";
export const UPI_ID = "sgkfancy@upi";
export const UPI_PHONE = "+91 76589 56116";
export const STORE_EMAIL = "contact@sgkfancystore.com";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function quickInquiryUrl(productName: string) {
  return whatsappUrl(
    `Hi SGK Fancy Store, I'm interested in *${productName}*. Could you share more details and current availability?`,
  );
}
