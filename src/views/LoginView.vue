<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email" />
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="login.password"
      />
      <button class="btn" @click.prevent="logar">Logar</button>
    </form>
    <p class="perdeu">
      <a href="/" target="_blank">Perdeu a senha? Clique aqui</a>
    </p>
    <LoginCriar />
  </section>
</template>

<script>
import LoginCriar from "@/components/LoginCriar.vue";
export default {
  name: "LoginView",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    logar() {
      this.$store.dispatch("getUsuario", this.login.email);
      this.$router.push({ name: "UsuarioView" });
    },
  },
  components: {
    LoginCriar,
  },
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}
h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}
form {
  display: grid;
}
.btn {
  width: 100%;
  max-width: 300px;
  margin: 25px auto;
}
.perdeu {
  text-align: center;
  margin: 0px auto 0 auto;
}
.perdeu a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>