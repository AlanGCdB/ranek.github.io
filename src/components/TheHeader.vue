<template>
  <header>
    <nav>
      <router-link :to="{ name: 'HomeView' }" class="logo">
        <img src="@/assets/ranek.svg" alt="Ranek" width="37" height="9" />
      </router-link>

      <div v-if="$store.state.login">
        <router-link :to="{ name: 'UsuarioView' }" class="btn">
          {{ nome }}
        </router-link>
      </div>
      <router-link v-else class="btn" :to="{ name: 'LoginView' }">
        Sell / Login
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  computed: {
    nome() {
      return this.$store.state.usuario.name.replace(/ .*/, "");
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.2);
}
.logo {
  padding: 10px 0;
}
.logo img {
  width: 90px;
  height: 62px;
}
</style>