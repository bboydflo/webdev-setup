import { ready } from "./modules/utils";

import "./css/styles.scss";
import svgIcon from "./images/ccheart_black.svg";

ready(() => {
  console.log("hello florin");

  // testing images
  const img = document.createElement("img");
  img.width = 24;
  img.height = 24;
  img.src = svgIcon;
  document.body.appendChild(img);

  // testing woff fonts
  const h1 = document.createElement("h1");
  h1.classList.add("fancy-text");
  h1.innerText = "Hello florin";
  document.body.appendChild(h1);
});
