const Koa = require("koa");
const history = require("connect-history-api-fallback");

const Vue = require("vue");
const VueRouter = require("vue-router");
const VSR = require("vue-server-renderer").createRenderer;

const App = require("./App.vue");
const route = require("./pages/route.vue");

const fs = require("fs");

Vue.use(VueRouter);
const site = new Koa();

// VIEWS

const routes = [
  { path: "*", component: route, meta: { title: "Sam Haakman" } }
];

const renderer = VSR({
  template: fs.readFileSync("../../template.html", "utf-8")
});

site.use(history());

site.use(async ctx => {
  const router = new VueRouter({
    mode: "history",
    routes
  });
  router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    window.scrollTo(0, 0);
    next();
  });

  const app = new Vue({
    el: "#app",
    router,
    render: h => h(App)
  });
  ctx.body = renderer
    .renderToString(app)
    .then(html => html)
    .catch(err => {
      console.error(err);
    });
});

site.listen(8082);
