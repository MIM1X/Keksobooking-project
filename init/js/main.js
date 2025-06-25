import {} from "./form.js";
import { createAdvertMarkup } from "./advert-markup.js";
import { creatMarkupFunc } from "./markup-utils.js";

document.querySelector("#map-canvas").append(createAdvertMarkup()[0]);

const Markup = creatMarkupFunc();

Markup.setElementsState(".map__filters", true);
Markup.setElementsState(".ad-form", true);
