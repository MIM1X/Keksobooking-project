import createAdvertData from "./advert-data.js";
const AdvertData = createAdvertData();

function createAdvert() {
  return {
    author: AdvertData.createAuthor(),
    offer: AdvertData.createOffer(),
    location: AdvertData.createLocation(),
  };
}

export const getAdvertsArray = (length = 10) => {
  return Array.from({ length: length }, () => createAdvert());
};
