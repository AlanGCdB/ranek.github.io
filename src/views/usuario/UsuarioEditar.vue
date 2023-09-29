<template>
  <section>
    <UsuarioFrom>
      <button class="btn" @click.prevent="atualizarUsuario">
        Atualizar Usuário
      </button>
    </UsuarioFrom>
  </section>
</template>

<script>
import UsuarioFrom from "@/components/UsuarioFrom.vue";
import { api } from "@/services";
import { mapState } from "vuex";

export default {
  name: "UsuarioEditar",
  components: {
    UsuarioFrom,
  },
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    atualizarUsuario() {
      api
        .put(`/usuario/${this.usuario.id}`, this.usuario)
        .then(() => {
          this.$store.dispatch("getUsuario");
          this.$router.push({ name: "UsuarioView" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>