export function isValidWhatsappNumber(number: string): boolean {
  return /^\d{8,15}$/.test(number);
}

export function buildQuoteMessage(service: string, location: string): string {
  return `Olá! Preciso de um orçamento gratuito para ${service}. Esta é a minha localização: ${location}.`;
}

export function buildWhatsappUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function isFilledText(value: string, minLength = 1): boolean {
  return value.trim().length >= minLength;
}
