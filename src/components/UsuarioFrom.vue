<template>
  <form>
    <div class="usuario" v-if="mostraDadosLogin">
      <label for="name">Name</label>
      <input type="text" name="name" id="name" v-model="name" />

      <label for="criarEmail">E-mail</label>
      <input type="email" name="email" id="criarEmail" v-model="email" />

      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model="password" />
    </div>

    <div class="usuario">
      <label for="zip_code">Zip code</label>
      <input
        type="text"
        name="zip_code"
        id="zip_code"
        v-model="zip_code"
        @keyup="peencherCep"
      />
      <label for="address">Address</label>
      <input type="text" name="address" id="address" v-model="address" />

      <label for="number">Numero</label>
      <input type="text" name="number" id="number" v-model="number" />

      <label for="bairro">Bairro</label>
      <input type="text" name="bairro" id="bairro" v-model="bairro" />

      <label for="city">City</label>
      <input type="text" name="city" id="city" v-model="city" />

      <label for="state">Estado</label>
      <input type="text" name="state" id="state" v-model="state" />

      <div class="button">
        <slot></slot>
      </div>
    </div>
  </form>
</template>

<script>
import { mapFields } from "@/helpers";
import { getCep } from "@/services";
export default {
  computed: {
    ...mapFields({
      fields: [
        "name",
        "email",
        "password",
        "zip_code",
        "address",
        "number",
        "bairro",
        "city",
        "state",
      ],
      base: "usuario",
      mutation: "UPDATE_USUARIO",
    }),
    mostraDadosLogin() {
      return !this.$store.state.login || this.$route.name === "UsuarioEditar";
    },
  },
  methods: {
    peencherCep() {
      const cep = this.zip_code.replace(/\D/g, "");
      if (cep.length === 8) {
        getCep(cep).then((response) => {
          this.address = response.data.logradouro;
          this.bairro = response.data.bairro;
          this.city = response.data.localidade;
          this.state = response.data.uf;
        });
      }
    },
  },
};
</script>

<style scoped>
.usuario {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
  margin: 0;
}
.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>