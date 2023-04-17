////// Component //////
export class Component {
  constructor(payload = {}) {
    const { tagName = "div", state = {}, props = {} } = payload;
    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
  }
  render() {
    //component를 확장할 때 사용
  }
}

////// Router //////
function routeRender(routes) {
  if (!location.hash) {
    history.replaceState(null, "", "/#/"); //history.replaceState : history내역의 기록을 남기지 않으면서 페이지 이동을 해줌
  }
  const routerView = document.querySelector("router-view");
  const [hash, queryString = ""] = location.hash.split("?"); //#/about?name=eunji : 물음표를 기준으로 hash와 queryString을 구분해서 배열데이터로 만든다

  //a=123&b=456
  //["a=123", "b=456"]
  //{a: "123", b: "456"}
  const query = queryString.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;
    return acc;
  }, {});
  history.replaceState(query, "");

  //각 페이지 정보 = route
  const currentRoute = routes.find((route) =>
    new RegExp(`${route.path}/?$`).test(hash)
  );
  routerView.innerHTML = "";
  routerView.append(new currentRoute.component().el);

  window.scrollTo(0, 0);
}

export function createRouter(routes) {
  return function () {
    window.addEventListener("popstate", () => {
      //popstate: 주소부분이 바뀔때
      routeRender(routes);
    });
    routeRender(routes);
  };
}

////// Store //////
export class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};
    for (const key in state) {
      //객체에 새로운 속성을 직접 정의하거나 이미 존재하는 속성을 수정한 후, 해당 객체를 반환
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: (val) => {
          state[key] = val; //state의 값을 갱신
          this.observers[key].forEach((observer) => observer(val));
        },
      });
    }
  }
  subscribe(key, cb) {
    // { message: [cb1, cb2, cb3, ...] }
    //this.observersp[key]가 배열이면
    Array.isArray(this.observers[key])
      ? this.observers[key].push(cb) //배열이면 콜백함수를 push
      : (this.observers[key] = [cb]); //배열이 아니면 콜백함수를 배열에 담아 할당한다
  }
}
