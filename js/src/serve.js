const Server = require("fastify")({
  logger: {
    prettyPrint: true,
  },
});
// const path = require('path');

const { createBundleRenderer } = require("vue-server-renderer");

const fs = require("fs");
//
// Vue.use(VueRouter);
const renderer = createBundleRenderer("/websites/sh5/js/serve/vue-ssr-server-bundle.json", {
  runInNewContext: false,
  template: fs.readFileSync("./index.template.html", "utf-8"),
});

Server.register(require("fastify-static"), {
  root: "/websites/sh5",
});

// Server.get("/js/dist/bundle.js", async (req, res) => {
//   console.log(req);
//   res.type("application/js").send(fs.readFile("./js/dist/bundle.js"));
// });
//
// Server.get("*.js", async (req, res) => {
//   res.type("application/js").send(fs.readFile(`.${req.raw.url}`));
// });
//
// Server.get("*.svg", async (req, res) => {
//   res.type("image/svg+xml").send(fs.readFile(`.${req.raw.url}`));
// });

Server.get("/", async (req, res) => {
  const context = { url: req.raw.url };
  renderer.renderToString(context, (err, html) => {
    // console.log("renderer", context);
    if (err) {
      res.send(err);
      if (err.code === 404) {
        res.status(404).send("Page not found");
      } else {
        res.status(500).send("Internal Server Error");
      }
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
