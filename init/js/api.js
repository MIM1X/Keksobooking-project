const getServerData = () => {
  return fetch("https://25.javascript.htmlacademy.pro/keksobooking/data").then(
    (response) => response.json()
  );
};

const sendServerData = (data) => {
  fetch("https://25.javascript.htmlacademy.pro/keksobooking", {
    method: "POST",
    body: data,
  });
};

export { getServerData, sendServerData };
