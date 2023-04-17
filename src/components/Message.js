import { Component } from "../core/core";
import messageStore from "../store/message";

export default class Message extends Component {
  constructor() {
    super();
    messageStore.subscribe("message", () => {
      this.render(); //메세지가 변경될 때마다 콜백함수 실행
    });
  }
  render() {
    this.el.innerHTML = /*html*/ `
      <h2>${messageStore.state.message}</h2>
    `;
  }
}
