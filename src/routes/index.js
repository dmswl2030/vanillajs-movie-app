import { createRouter } from "../core/core";
import Home from "./Home";
import About from "./About";

//페이지 구분을 위한 createRouter
export default createRouter([
  { path: "#/", component: Home },
  { path: "#/about", component: About },
]);
