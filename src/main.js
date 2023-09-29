import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PageLoading from "@/components/PaginaCarregando";

Vue.config.productionTip = false;

Vue.component("PageLoading", PageLoading);

Vue.filter("numberPrice", (valor) => {
  valor = Number(valor);
  if (!isNaN(valor)) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } else {
    return null;
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
