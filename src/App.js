import { Component } from "./core/core";
import FruitItem from "./components/FruitItem";

export default class App extends Component {
  constructor() {
    super({
      state: {
        fruits: [
          { name: "Apple", price: 1000 },
          { name: "Banana", price: 2000 },
          { name: "Cherry", price: 3000 },
        ],
      },
    });
  }
  render() {
    console.log(this.state.fruits);
    this.el.innerHTML = /*html*/ `
    <h1>Fruits</h1>
    <ul>
    </ul>
    `;
    const ulEl = this.el.querySelector("ul");

    ulEl.append(
      ...this.state.fruits.map(
        (fruit) =>
          new FruitItem({
            //props : 부모 컴포넌트가 자식 컴포넌트에 내려주는 속성
            props: {
              name: fruit.name,
              price: fruit.price,
            },
          }).el
      )
    );
  }
}
