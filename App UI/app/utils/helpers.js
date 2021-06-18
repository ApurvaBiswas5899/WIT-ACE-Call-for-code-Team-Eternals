export function isEmail(email) {
  const reg = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  );
  return reg.test(email);
}

export function changeOpacity(color) {
  return color;
}

export function getGeoDistance(loc1, loc2) {
  return 500;
}

export function getCategoryName(index) {
  return 'South Indian';
}
