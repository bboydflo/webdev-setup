import { ready } from "./modules/utils";

import "./css/styles.scss";
import svgIcon from "./images/ccheart_black.svg";

ready(() => {
  console.log("hello webpack");

  var img = document.createElement("img");
  img.width = 24;
  img.height = 24;
  img.src = svgIcon;
  document.body.appendChild(img);
});
