function replaceFrenchCommaWithDot(price) {
  if (typeof price === 'string') price = parseFloat(price.replace(',', '.'));
  return price;
}

export function formatPrice(priceToFormat) {
  if (!priceToFormat) return '0,00 €';

  const price = replaceFrenchCommaWithDot(priceToFormat);
  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);

  return formattedPrice;
}

export function roundPrice(price, decimals = 2) {
  return Number(price.toFixed(decimals));
}
