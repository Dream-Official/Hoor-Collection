export const WHATSAPP_NUMBER = '923160010301';

export interface WhatsAppOrderParams {
  productTitle: string;
  productSku: string;
  fabricType: string;
  workType: string;
  stitchingType: string;
  size: string;
  quantity: number | string;
  price: string;
  productUrl?: string;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  customerCity?: string;
  notes?: string;
}

/**
 * Builds the exact WhatsApp order message template for Hoor Collection
 */
export function buildWhatsAppOrderMessage(params: WhatsAppOrderParams): string {
  const {
    productTitle,
    productSku,
    fabricType,
    workType,
    stitchingType,
    size,
    quantity,
    price,
    productUrl = typeof window !== 'undefined' ? window.location.href : '',
    customerName = '_____________',
    customerPhone = '_____________',
    customerAddress = '_____________',
    customerCity = '_____________',
    notes = '_______________',
  } = params;

  return [
    '🛍️ *HOOR COLLECTION — NEW ORDER*',
    '━━━━━━━━━━━━━━━━━━━━━━',
    '📦 *PRODUCT DETAILS:*',
    `• Product Name: ${productTitle}`,
    `• SKU: ${productSku}`,
    `• Fabric: ${fabricType}`,
    `• Work: ${workType}`,
    '👗 *ORDER SPECIFICATIONS:*',
    `• Stitching: ${stitchingType}`,
    `• Size: ${size || 'Standard / Unstitched'}`,
    `• Quantity: ${quantity}`,
    `• Price: ${price}`,
    '━━━━━━━━━━━━━━━━━━━━━━',
    '👤 *CUSTOMER INFO:*',
    `• Name: ${customerName}`,
    `• Phone: ${customerPhone}`,
    `• Address: ${customerAddress}`,
    `• City: ${customerCity}`,
    '📝 *Notes:*',
    notes,
    `🔗 Product Link: ${productUrl}`,
  ].join('\n');
}

/**
 * Returns formatted WhatsApp URL with encoded message
 */
export function getWhatsAppOrderUrl(params: WhatsAppOrderParams): string {
  const message = buildWhatsAppOrderMessage(params);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Direct greeting link for concierge and floating WhatsApp button
 */
export function getWhatsAppGreetingUrl(
  greeting = 'Hello Hoor Collection! I would like to inquire about your luxury collection.'
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(greeting)}`;
}
