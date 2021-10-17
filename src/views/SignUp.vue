<template>
  <div class="signUp_user">
    <div class="container_signUp_user">
      <h2>Registrese</h2>
      <form v-on:submit.prevent="processSignUp">
        <input type="number" v-model="user.id" placeholder="Numero de CC">
        <br>
        <input type="text" v-model="user.name" placeholder="Nombre">
        <br>
        <input type="text" v-model="user.surname" placeholder="Apellido">
        <br>
        <input type="text" v-model="user.account.username" placeholder="Username">
        <br>
        <input type="text" v-model="user.account.password" placeholder="Password">
        <br>
        <input type="email" v-model="user.account.email" placeholder="Email">
        <br>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SingUp",
  data: function () {
    return {
      user: {
        id: 0,
        name: "",
        surname: "",
        account: {
          username: "",
          password: "",
          email: ""
        },
      }
    }
  },
  methods: {
    processSignUp: function () {
      axios.post(
          "https://ecommerce-aacjp-missiontic.herokuapp.com/api/users/create",
          this.user,
          {headers: {}}
      ).then((result) => {
        const dataSignUp = {
          username: this.user.account.username,
          token_access: result.data.access,
          token_refresh: result.data.refresh,
        }
        this.$emit('completedSignup', dataSignUp)
      }).catch((error) => {
        console.log(error)
        alert("Fallo en el registro")
      })
    }
  }
}
</script>

<style scoped>
.signUp_user {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container_signUp_user {
  border: 3px solid #0AF;

  border-radius: 10px;

  width: 25%;
  height: 60%;
  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

}

.signUp_user h2 {
  color: #000;

}

.signUp_user form {

  width: 70%;

}

.signUp_user input {

  height: 40px;
  width: 100%;

  box-sizing: border-box;

  padding: 10px 20px;

  margin: 5px 0;
  border: 1px solid #09F;

}

.signUp_user button {

  width: 100%;
  height: 40px;
  color: #000;
  background: #0aF;

  border: 1px solid #E5E7E9;

  border-radius: 5px;

  padding: 10px 25px;

  margin: 5px 0 25px 0;

}

.signUp_user button:hover {

  color: #fff;
  background: #05F;
  border: 1px solid #283747;
}
</style>