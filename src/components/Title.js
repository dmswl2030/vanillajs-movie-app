import { Component } from "../core/core";
import messageStore from "../store/message";

export default class Title extends Component {
  constructor() {
    super({
      tagName: "h1",
    });
    messageStore.subscribe("message", (newVal) => {
      console.log("newVal: ", newVal);
      this.render(); //메세지가 변경될 때마다 콜백함수 실행
    });
  }
  render() {
    this.el.textContent = `Title: ${messageStore.state.message}`;
  }
}
