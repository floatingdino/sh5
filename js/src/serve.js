const Server = require("fastify")({
  logger: {
    prettyPrint: true,
  },
});
// const App = require("../serve/bundle.js");
// const history = require("connect-history-api-fallback");

// const Vue = require("vue");
// const VueRouter = require("vue-router");
const { createBundleRenderer } = require("vue-server-renderer");
//
// const App = require("./App.vue");
// const route = require("./pages/route.vue");
//
const fs = require("fs");
//
// Vue.use(VueRouter);
const renderer = createBundleRenderer("/websites/sh5/js/serve/vue-ssr-server-bundle.json", {
  runInNewContext: false,
  template: fs.readFileSync("./index.template.html", "utf-8"),
});

Server.get("/js/dist/bundle.js", async (req, res) => {
  res.type("application/js").send(fs.readFileSync("./js/dist/bundle.js"));
});

Server.get("*", async (req, res) => {
  const context = { url: req.raw.url };
  // console.log("pre", req.raw.url, req);
  renderer.renderToString(context, (err, html) => {
    // console.log("renderer", context);
    if (err) {
      console.log(err);
      res.send(err);
      // if (err.code === 404) {
      //   res.status(404).end("Page not found");
      // } else {
      //   res.status(500).end("Internal Server Error");
      // }
    } else {
      res.type("text/html").send(html);
    }
  });
});

const start = async () => {
  try {
    console.log("Server Launching");
    await Server.listen(8082);
  } catch (err) {
    Server.log.error(err);
    process.exit(1);
  }
};
start();
