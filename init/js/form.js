import { CENTER_TOKYO, TYPES } from "./constants.js";
import { sendServerData } from "./api.js";
import { mainPinMarker, map } from "./map.js";
import { showNotification } from "./form-notifications.js";

const formFilters = document.querySelector(".map__filters");
const form = document.querySelector(".ad-form");

const pristine = new Pristine(form);

const rooms = form.querySelector("#room_number");
const guests = form.querySelector("#capacity");

const type = form.querySelector("#type");
const price = form.querySelector("#price");

const slider = form.querySelector(".ad-form__slider");

const timeForm = form.querySelector(".ad-form__element--time");
const timeIn = form.querySelector("#timein");
const timeOut = form.querySelector("#timeout");

const resetBtn = form.querySelector(".ad-form__reset");

const address = document.querySelector("#address");

address.value = Object.values(CENTER_TOKYO).join(", ");

pristine.addValidator(
  guests,
  function (value) {
    const roomsValue = +rooms.value;

    const guestsValue = +value;

    return roomsValue === 100
      ? guestsValue === 0
      : guestsValue >= 1 && guestsValue <= roomsValue;
  },
  function () {
    switch (rooms.value) {
      case "1":
        return 'Для 1 комнаты можно выбрать только "для 1 гостя"';
      case "2":
        return 'Для 2 комнат можно выбрать "для 1 гостя" или "для 2 гостей"';
      case "3":
        return 'Для 3 комнат можно выбрать "для 1 гостя", "для 2 гостей" или "для 3 гостей"';
      case "100":
        return 'Для 100 комнат можно выбрать только "не для гостей"';
      default:
        return "Некорректное количество гостей для выбранного количества комнат";
    }
  }
);

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: "lower",
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return +value;
    },
  },
});

slider.noUiSlider.on("update", () => {
  price.value = slider.noUiSlider.get();
});

type.addEventListener("change", function () {
  const minPrice = TYPES[type.value].price;
  price.min = minPrice;
  price.placeholder = minPrice;

  slider.noUiSlider.updateOptions({
    range: {
      min: minPrice,
      max: 100000,
    },
    start: minPrice,
    step: 1,
  });
});

pristine.addValidator(
  price,
  function (value) {
    return value >= TYPES[type.value].price;
  },
  function () {
    return `Минимальная цена для ${type.value} — ${TYPES[type.value].price}`;
  }
);

function syncTimes(evt) {
  timeIn.value = timeOut.value = evt.target.value;
}
timeForm.addEventListener("change", syncTimes);

function resetForm() {
  formFilters.reset();
  form.reset();
  mainPinMarker.setLatLng(CENTER_TOKYO);
  map.setView(CENTER_TOKYO, 12);
  address.value = Object.values(CENTER_TOKYO).join(", ");

  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100000,
    },
    start: 0,
    step: 1,
  });
}

mainPinMarker.on("moveend", (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(6)}, ${evt.target
    .getLatLng()
    .lng.toFixed(6)}`;
});

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    const formData = new FormData(form);
    sendServerData(formData);

    resetForm();
    showNotification();
  } else {
    showNotification(true);
  }
});

resetBtn.addEventListener("click", (evt) => {
  evt.preventDefault();

  resetForm();
});
