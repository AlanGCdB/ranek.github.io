<template>
  <div>
    <section>
      <h2>Crie a sua conta</h2>
      <transition mode="out-in">
        <button v-if="!criar" class="btn" @click="criar = true">
          Criar conta
        </button>
        <UsuarioFrom v-else>
          <button class="btn btn-form" @click.prevent="criarUsuario">
            Criar Usúario
          </button>
        </UsuarioFrom>
      </transition>
    </section>
  </div>
</template>

<script>
import UsuarioFrom from "@/components/UsuarioFrom";
export default {
  name: "LoginCriar",
  data() {
    return {
      criar: false,
    };
  },
  methods: {
    async criarUsuario() {
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch(
          "getUsuario",
          this.$store.state.usuario.email
        );
        this.$router.push({ name: "UsuarioView" });
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    UsuarioFrom,
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}
.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
.btn-form {
  max-width: 100%;
}
</style>