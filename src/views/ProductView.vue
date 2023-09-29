<template>
  <section>
    <div v-if="product" class="product">
      <ul class="photos" v-if="product.fotos">
        <li v-for="(photo, index) in product.fotos" :key="index">
          <img :src="photo.src" :alt="photo.titulo" srcset="" />
        </li>
      </ul>
      <div class="info">
        <h1>{{ product.nome }}</h1>
        <p class="price">{{ product.preco | numberPrice }}</p>
        <p class="description">{{ product.descricao }}</p>
        <transition mode="in-out" v-if="product.vendido === 'false'">
          <button class="btn" v-if="!finalizar" @click="finalizar = true">
            Purchase
          </button>
          <FinalizarCompra v-else :produto="product" />
        </transition>
        <button v-else class="btn" disabled>Product sold</button>
      </div>
    </div>
    <pageLoading v-else />
  </section>
</template>

<script>
import { api } from "@/services";
import FinalizarCompra from "@/components/FinalizarCompra.vue";
export default {
  name: "ProductView",
  components: {
    FinalizarCompra,
  },
  props: ["id"],
  data() {
    return {
      product: "",
      finalizar: false,
    };
  },
  methods: {
    getProduct() {
      api.get(`/produto/${this.id}`).then((resposta) => {
        this.product = resposta.data;
      });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.price {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 5px;
  margin-bottom: 40px;
}
.description {
  font-size: 1.2rem;
}
.btn {
  margin-top: 60px;
  width: 200px;
}
</style>