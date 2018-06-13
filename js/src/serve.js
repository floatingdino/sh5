const Server = require("fastify")();
const createApp = require("../serve/bundle.js");
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

const renderer = createBundleRenderer("../serve/vue-ssr-server-bundle.json", {
  template: fs.readFileSync("./index.template.html"),
});

Server.get("*", async (req, res) => {
  const context = { url: req.url };
  createApp(context).then((app) => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end("Page not found");
        } else {
          res.status(500).end("Internal Server Error");
        }
      } else {
        res.send(html);
      }
    });
  });
  // reply.send({ aaa: "aaaaa" });
});

const start = async () => {
  try {
    await Server.listen(8082);
  } catch (err) {
    Server.log.error(err);
    process.exit(1);
  }
};
start();
