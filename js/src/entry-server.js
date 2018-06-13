import createApp from "./app";
// import Vue from "vue";

export default context =>
  new Promise((resolve, reject) => {
    // console.log(context);
    const { app, router } = createApp();
    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();

      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      return resolve(app);
    }, reject);
  });
