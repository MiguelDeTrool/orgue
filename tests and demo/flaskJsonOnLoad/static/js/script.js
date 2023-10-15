let body = document.querySelector("body");
let element = document.createElement("div");
element.textContent = "ajcshbdksjcsdM";
body.appendChild(element);

let url = document.URL;
fetch(`${url}image`, {
  mode: "cors",
}).then((response) => {
  console.log(response.json());
  element.remove();
});
