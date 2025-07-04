const getServerData = () => {
  return fetch("https://25.javascript.htmlacademy.pro/keksobooking/data")
    .then((response) => response.json())
    .catch((error) => alert(error));
};

const sendServerData = (data) => {
  fetch("https://25.javascript.htmlacademy.pro/keksobooking", {
    method: "POST",
    body: data,
  });
};

export { getServerData, sendServerData };
