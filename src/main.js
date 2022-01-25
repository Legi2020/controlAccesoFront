import { createApp } from "vue";
import App from "./App.vue";
import VueSweetalert2 from "vue-sweetalert2";
import { createWebHistory, createRouter } from "vue-router";
import "sweetalert2/dist/sweetalert2.min.css";

import Administracion from "./components/Administracion.vue";
import IEdelDia from "./components/IEdelDia.vue";
import Informe from "./components/Informe.vue";
import Detalle from "./components/Detalle.vue";
import Login from "./components/Login.vue";
import axios from "axios";

const routes = [
  { path: "/", name: 'home', component: IEdelDia },
  { path: "/informe", component: Informe, meta: { requiresAuth: true } },
  { path: "/administracion", component: Administracion, meta: { requiresAuth: true } },
  {
    path: "/informe/:id",
    name: "detalle",
    component: Detalle,
    meta: { requiresAuth: true },
  },
  { path: "/login", name: "login", component: Login },
  { path: "/:catchAll(.*)", redirect: "/" },
];

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["access-token"] = token;
}

const router = createRouter({
  history: createWebHistory(),
  saveScrollPosition: true,
  transitionOnLoad: true,
  routes,
});

router.beforeEach((to, from, next) => {
  axios
    .post(process.env.VUE_APP_API_ROUTE + "verificar-token", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        token: localStorage.getItem("token"),
      },
    })
    .then((resp) => {
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!resp.data.error) {
          localStorage.setItem("logueado", true);
          next();
        } else {
          router.push("login");
          localStorage.setItem("logueado", false);
        }
      } else {
        next();
      }
    });
});

createApp(App)
  .use(router)
  .use(VueSweetalert2)
  .mount("#app");
