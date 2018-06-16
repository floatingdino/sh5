declare namespace window {
  const __INITIAL_STATE__: object;
}

import createApp from "./app";

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  if (!window.__INITIAL_STATE__) {
    const c = router.getMatchedComponents();
    c[0].asyncData({ store, route: router.currentRoute }).then(() => {
      c[0].routeLoading = false;
    });
  }
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    let diffed = false;
    // const activated = matched.filter((c, i) => {
    //   return diffed || (diffed = prevMatched[i] !== c);
    // });
    // console.log(!activated.length, matched);
    // if (!activated.length) {
    //   return next();
    // }

    matched[0].props.routeLoading = true;

    Promise.all(
      matched.map(c => {
        if (c.asyncData) {
          c.props.routeLoading = true;
          console.log(c, c.props.routeLoading);
          return c.asyncData({ store, route: to });
        }
      }),
    )
      .then(() => {
        matched[0].props.routeLoading = false;

        next();
      })
      .catch(next);
  });
  console.log(router);
  app.$mount("#app");
});
