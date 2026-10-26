// adds commas: 6500000 -> 6,500,000 EGP
export function formatPrice(price, type) {
  const text = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' EGP';
  if (type === 'rent') {
    return text + ' / month';
  }
  return text;
}

export function getAverageRating(reviewList) {
  if (reviewList.length === 0) {
    return 0;
  }
  let total = 0;
  reviewList.forEach((review) => {
    total += review.stars;
  });
  return total / reviewList.length;
}