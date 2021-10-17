<template>
  <div class="body">
    <div class="nav-bar">

      <div id="nav">
        <img src="https://lancetalent.com/wp-content/uploads/2017/05/ecommerceok.png" alt="Logo-Ciclo3-Tienda"/>
        <p>Tienda Virtual</p>

        <div class="buttons">
          <Button_Nav v-if="is_auth" v-on:click="loadHome" msg="Tienda"/>
          <Button_Nav v-if="is_auth" v-on:click="loadOrder" msg="MiPedido"/>
          <Button_Nav v-if="is_auth" v-on:click="loadCar" msg="MiCarrito"/>
          <Button_Nav v-if="is_auth" v-on:click="loadProfile" msg="MiCuenta"/>
          <Button_Nav v-if="is_auth" v-on:click="logOut" msg="Cerrar Sesion"></Button_Nav>
          <Button_Nav v-if="!is_auth" v-on:click="loadLogin" msg="Iniciar Sesión"/>
          <Button_Nav v-if="!is_auth" v-on:click="loadSignup" msg="Registrarse"/>
        </div>
      </div>
    </div>

    <div class="main_component">
      <router-view
          v-on:completedLogin="completedLogin"
          v-on:completedSignup="completedSignup"
          v-on:logOut="logOut"
      >
      </router-view>
    </div>
  </div>

  <Footer class="foot"/>
</template>

<script>
import Button_Nav from "./components/Button_Nav";
import Footer from "./components/Footer";

export default {
  name: 'App',
  data: function () {
    return {is_auth: false}
  },
  components: {
    Footer,
    Button_Nav
  },

  methods: {
    verifyAuth: function () {
      this.is_auth = localStorage.getItem('is_auth') || false
      if (this.is_auth === false)
        this.$router.push({name: "login"})
      else this.$router.push({name: "home"})
    },
    loadLogin: function () {
      this.$router.push({name: "login"})
    },
    loadSignup: function () {
      this.$router.push({name: "signup"})
    },
    completedLogin: function (data) {
      console.log("completedLogin")
      localStorage.setItem("is_auth", true);
      localStorage.setItem("username", data.username)
      localStorage.setItem("token_access", data.token_access)
      localStorage.setItem("token_refresh", data.token_refresh)
      this.verifyAuth()

    },
    completedSignup: function (data) {
      this.completedLogin(data)
    },
    loadHome: function () {
      this.$router.push({name: "home"})
    },
    logOut: function () {
      localStorage.clear()
      this.verifyAuth()
    }
  },
  created: function () {
    console.log("Creado")
    this.verifyAuth()
    console.log(this.is_auth)
  }
}
</script>
<style>


#nav {
  height: 3em;
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 3;
}

.nav-bar{
  background-color:white;
  width: 100vw;
  left: 0;
  top: 0;
  height: 4em;
  position: fixed;
  z-index: 2;
  margin: 0;
  padding: 0;
  box-shadow: 0 1px 20px #aaa;

}

.buttons {
  display: flex;
  position: fixed;
  right: 0;
  top: 0;
  margin: 5px;
}

p {
  font-size: 20px;
  font-weight: bold;
  margin-left: 5px;
  cursor: pointer;
}

img {
  height: 100%;
}

.main_component {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 0;
  top: 50px;
  margin-bottom: 150px;
  margin-top: 2rem;
  height: 100%;
}

.foot {
  bottom: 0;
}

.body {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
}
</style>
