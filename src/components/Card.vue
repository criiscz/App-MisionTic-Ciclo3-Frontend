<template>
  <div class="card">
    <p>Producto: {{ product_name }}<br>
      <span>Precio: {{ price }}</span></p>
    <div class="add-car no-select" v-on:click="addToCar">Agregar a carrito</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Card",
  data: function () {
    return {
      product: {
        id: Number,
        product_name: String,
        price: Number
      }
    }
  },
  props: {
    product_name: String,
    price: Number,
    id: Number
  },
  methods: {
    addToCar: async function () {
      await this.getProduct()
      await this.$parent.addToCar(this.product)
    },
    getProduct: async function () {
      await this.$parent.verifyToken()
      const token = localStorage.getItem('token_access')
      await axios.get(
          `https://ecommerce-aacjp-missiontic.herokuapp.com/api/products/${this.id}`,
          {headers: {'Authorization': `Bearer ${token}`}}
      ).then((result) => {
        this.product = result.data[0];
        console.log(this.product)
      }).catch((error) => {
        alert(error)
      })
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 5px;
  margin: 5px;
  width: 15em;
  height: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: 1px 1px 5px;
  -moz-box-shadow: 1px 1px 5px;
  box-shadow: 1px 1px 5px;
}

.add-car {
  background-color: #5c8dcd;
  border-radius: 5px;
  padding: 5px;
  transition: all 0.2s;
  cursor: pointer;
}

.add-car:hover {
  background-color: #5c9dcd;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -ms-transform: scale(1.1);
  -o-transform: scale(1.1);
  transform: scale(1.1);
}

.add-car:active {
  background-color: #5c7dcd;
}

.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
</style>