import { isEmpty } from './checks';

export function validateUrl(url) {
  const isUrlEmpty = isEmpty(url);

  if (isUrlEmpty) return '';

  // regular expression of image url with specific format (jpg, jpeg, png, webp, tif, tiff)
  const pattern = new RegExp(
    '^(http(s)?:\\/\\/)?[\\w@:%._+~#-=/,]*(.(jpg|jpeg|png|webp|tif|tiff))([?\\w=]*)?',
    'gi'
  );
  const isUrlValid = pattern.test(url);

  if (isUrlValid) return '';

  return 'Please provide a valid image URL (formats: jpg, jpeg, png, webp, tif, tiff)';
}

export function validatePrice(price) {
  const isPriceEmpty = isEmpty(price);

  if (isPriceEmpty) return '';

  if (price >= 100) return 'Please enter a reasonable price';

  // regular expression for positive decimal numbers (with comma or dot separator)
  const pattern = new RegExp('^(?!-)(?:[1-9][0-9]*|0)?(?:(\\.|,))?[0-9]+$');

  const isPriceValid = pattern.test(price);

  if (isPriceValid) return '';

  return 'Please provide a positive number';
}
