function getUser() {
  fetch('http://localhost:8000/')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
  getUser
};