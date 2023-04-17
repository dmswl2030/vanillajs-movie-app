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
