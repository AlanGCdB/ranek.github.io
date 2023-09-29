import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import LoginView from "../views/LoginView.vue";
import UsuarioView from "../views/usuario/UsuarioView.vue";
import UsuarioProdutos from "../views/usuario/UsuarioProdutos.vue";
import UsuarioCompras from "../views/usuario/UsuarioCompras.vue";
import UsuarioEditar from "../views/usuario/UsuarioEditar.vue";
import UsuarioVendas from "../views/usuario/UsuarioVendas.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/produto/:id",
      name: "ProductView",
      component: ProductView,
      props: true,
    },
    {
      path: "/login",
      name: "LoginView",
      component: LoginView,
    },
    {
      path: "/usuario",
      component: UsuarioView,
      children: [
        {
          path: "",
          name: "UsuarioView",
          component: UsuarioProdutos,
        },
        {
          path: "Compras",
          name: "UsuarioCompra",
          component: UsuarioCompras,
        },
        {
          path: "Editar",
          name: "UsuarioEditar",
          component: UsuarioEditar,
        },
        {
          path: "Vendas",
          name: "UsuarioVendas",
          component: UsuarioVendas,
        },
      ],
    },
  ],
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

export default router;
