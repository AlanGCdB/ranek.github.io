<template>
  <div class="home">
    <section>
      <h1>👍 Buy or sell 👎</h1>
      <ProdutosBuscar />
      <ProductsList />
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import ProdutosBuscar from "@/components/ProdutosBuscar.vue";
import ProductsList from "@/components/ProdutosLista.vue";

export default {
  name: "HomeView",
  components: {
    ProdutosBuscar,
    ProductsList,
  },
};
</script>
<style scoped>
h1 {
  color: #87f;
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
}
</style>
