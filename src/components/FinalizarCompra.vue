<template>
  <section>
    <h2>Endereço de envio</h2>
    <UsuarioFrom />
    <button class="btn" @click.prevent="finalizarCompra">
      Finalizar Compra
    </button>
  </section>
</template>

<script>
import UsuarioFrom from "@/components/UsuarioFrom.vue";
import { mapState } from "vuex";
import { api } from "@/services";
export default {
  name: "FinalizarCompra",
  components: {
    UsuarioFrom,
  },
  props: ["produto"],
  computed: {
    ...mapState(["usuario"]),
    compra() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.usuario.zip_code,
          endereco: this.usuario.address,
          numero: this.usuario.number,
          bairro: this.usuario.bairro,
          cidade: this.usuario.city,
          estado: this.usuario.state,
        },
      };
    },
  },
  methods: {
    criarTransacao() {
      return api.post("/transacao", this.compra).then(() => {
        this.$router.push({ name: "UsuarioCompra" });
      });
    },
    async criarUsuario() {
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch(
          "getUsuario",
          this.$store.state.usuario.email
        );
        await this.criarTransacao();
      } catch (error) {
        console.log(error);
      }
    },
    finalizarCompra() {
      if (this.$store.state.login) {
        this.criarTransacao();
      } else {
        this.criarUsuario();
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>