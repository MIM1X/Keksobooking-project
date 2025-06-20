import { createAdvertMarkup } from "./advert-markup.js";
import {} from "./form.js";

console.log(createAdvertMarkup());

document.querySelector("#map-canvas").append(createAdvertMarkup()[0]);
