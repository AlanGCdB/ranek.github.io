<template>
  <section class="container-products">
    <transition mode="out-in">
      <div v-if="products && products.length" class="products" key="product">
        <div v-for="product in products" :key="product.id" class="product">
          <router-link
            :to="{ name: 'ProductView', params: { id: product.id } }"
          >
            <img
              v-if="product.fotos"
              :src="product.fotos[0].src"
              :alt="product.fotos[0].titulo"
            />
            <p class="price">{{ product.preco | numberPrice }}</p>
            <h2 class="title">{{ product.nome }}</h2>
            <p>{{ product.descricao }}</p>
          </router-link>
        </div>
        <ProductsPages
          :productsTotal="productsTotal"
          :productsProPages="productsProPage"
        />
      </div>
      <div v-else-if="products && products.length === 0" key="result">
        <p class="noResults">
          Search without results,try searching for another term
        </p>
      </div>
      <PageLoading v-else key="loading" />
    </transition>
  </section>
</template>
  
  <script>
import ProductsPages from "@/components/ProdutosPagina.vue";
import { api } from "@/services";
import { serialize } from "@/helpers";
export default {
  name: "ProductsList",
  components: {
    ProductsPages,
  },
  data() {
    return {
      products: null,
      productsProPage: 3,
      productsTotal: 0,
    };
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/produto?_limit=${this.productsProPage}${query}`;
    },
  },
  methods: {
    getProducts() {
      this.products = null;
      setTimeout(() => {
        api.get(this.url).then((resposta) => {
          this.productsTotal = Number(resposta.headers["x-total-count"]);
          this.products = resposta.data;
        });
      }, 900);
    },
  },
  watch: {
    url() {
      this.getProducts();
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
  
  <style scoped>
.container-products {
  max-width: 1000px;
  margin: 0 auto;
}
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 30px;
}
.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  padding: 10px;
  background: #ffffff;
  border-radius: 4px;
  transition: all 0.2s;
}
.product:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.3);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}
.product img {
  border-radius: 4px;
  margin-bottom: 20px;
}
.title {
  margin-bottom: 10px;
}
.price {
  color: #e80;
  font-weight: bold;
}
.noResults {
  text-align: center;
}
</style>









