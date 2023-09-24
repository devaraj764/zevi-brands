import { faker } from '@faker-js/faker';
import { FilterProps, ProductType } from '../interfaces';

export const BrandsList = [
  'Nike',
  'Adidas',
  'Zara',
  'Gucci',
  'H&M'
];

export const PriceRanges = [
  [0, 1000],
  [1000, 5000],
  [5000, 100000],
  [10000, 30000],
  [30000, 50000]
]

function getRandomClothingBrand() {

  const randomIndex = Math.floor(Math.random() * BrandsList.length);
  const randomBrand = BrandsList[randomIndex];

  return randomBrand;
}

export function generateFakeData(numRecords: number) {
  const commerceData = [];

  for (let i = 0; i < numRecords; i++) {
    const productImage = faker.image.urlLoremFlickr({
      category: 'dress', height: 325,
      width: 239
    });
    const productName = faker.commerce.productName();
    const productPrice = parseFloat(faker.commerce.price({
      min: 100,
      max: 50000
    }));
    const productOriginalPrice = productPrice - Math.floor((Math.random() * (10000)));
    const productBrand = getRandomClothingBrand();
    const productRating = parseFloat((Math.random() * 5).toFixed(0)); // Generate a random rating between 0.0 and 5.0
    const numberOfRatings = Math.floor(Math.random() * (301));

    commerceData.push({
      productImage,
      productName,
      productPrice,
      productOriginalPrice,
      productBrand,
      productRating,
      numberOfRatings,
    });
  }

  return commerceData;
}

const checkIfPriceMatches = (pricing: number[][], price: number) => {
  const data = pricing.filter((item: number[]) => (item[0] <= price) && (item[1] >= price))
  return data.length > 0 ? true : false;
}

export function FilterProducts({ search, brands, pricing, ratings, data }: FilterProps) {
  var filteredProducts = data;

  if (brands && brands.length > 0) {
    filteredProducts = filteredProducts.filter((product: ProductType) => brands.includes(product.productBrand))
  }

  if (pricing && pricing.length > 0) {
    filteredProducts = filteredProducts.filter((product: ProductType) => checkIfPriceMatches(pricing, product.productPrice));
  }

  if (ratings && ratings.length > 0) {
    filteredProducts = filteredProducts.filter((product: ProductType) => ratings.includes(product.productRating))
  }

  if (search && search !== '') {
    filteredProducts = filteredProducts.filter((product: ProductType) => product.productName.toLowerCase().replaceAll(' ', '-').includes(search.toLowerCase().replaceAll(' ', '-')))
  }

  return filteredProducts;
}