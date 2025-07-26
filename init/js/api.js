const getServerData = (onSuccess) => {
  return fetch("https://25.javascript.htmlacademy.pro/keksobooking/data")
    .then((response) => response.json())
    .then((adverts) => onSuccess(adverts))
    .catch((error) => alert(error));
};

const sendServerData = (data) => {
  fetch("https://25.javascript.htmlacademy.pro/keksobooking", {
    method: "POST",
    body: data,
  });
};

export { getServerData, sendServerData };
