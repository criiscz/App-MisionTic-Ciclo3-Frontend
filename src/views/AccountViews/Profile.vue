<template>
  <div class="data">
    <p v-if="id === Number">Cargando datos...</p>
    <div class="titles" v-if="id !== Number">
      <h2>Nombre: </h2>
      <h2>Apellido: </h2>
      <h2>Cédula: </h2>
      <h2>Email: </h2>
    </div>
    <div class="values" v-if="id !== Number">
      <h2>{{ nameClient }}</h2>
      <h2>{{ surnames }}</h2>
      <h2>{{ id }}</h2>
      <h2>{{ email }}</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      nameClient:String,
      surnames:String,
      id:Number,
      email:String
    }
  },
  methods: {
    getData: function (){
      this.verifyToken()
      const token = localStorage.getItem("token_access")
      axios.get(
          "https://ecommerce-aacjp-missiontic.herokuapp.com/api/users/current/",
          {headers:{"Authorization" : `Bearer ${token}`}}
      ).then(result => {
        this.id=result.data.id
        this.nameClient = result.data.name
        this.surnames = result.data.surname
        this.email = result.data.account.email
      }).catch(error => {
        console.error(error)
      })
    },
    verifyToken: async function () {
      return axios.post("https://ecommerce-aacjp-missiontic.herokuapp.com/refresh",
          {refresh: localStorage.getItem("token_refresh")}, {headers: {}}).then((result) => {
        localStorage.setItem("token_access", result.data.access);
      }).catch((error) => {
        this.$parent.logOut()
      })
    },
  },
  created() {
    this.getData();
  }
}
</script>

<style scoped lang="scss">

*{
  font-family: "Segoe UI Symbol",serif;
}

.data {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  padding: 2em;
  justify-content: center;
  align-items: center;
  place-self: center;
  box-shadow: inset 0 0 5px;

  .values {
    text-align: right;
  }
}

</style>