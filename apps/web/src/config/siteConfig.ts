const env = (import.meta as any).env || {};

export const SITE_CONFIG = {
  shopName: env.VITE_SHOP_NAME || 'Sree Ram Silks',
  ownerName: env.VITE_OWNER_NAME || 'M Suryaveera',
  whatsappNumber: env.VITE_WHATSAPP_NUMBER || '+919483757825',
  phoneDisplay: '+91 94837 57825',
  email: 'suryaveera@sreeramsilks.com',
  getWhatsAppUrl: (message: string) => {
    const raw = env.VITE_WHATSAPP_NUMBER || '+919483757825';
    const cleanNumber = raw.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  },
};
