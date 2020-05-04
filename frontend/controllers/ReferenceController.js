export async function getUser() {
  const response = await fetch('http://localhost:8000/lm/users/?id=5eab42ff0da6924cccfefe38');
  return response.json();
    // .then((response) => {
    //   return response.json();
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
}