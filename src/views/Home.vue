<template>
  <div class="home">
    <h1>Productos</h1>
    <div class="products">
      <Card v-for="{name, sell_price, id} in products" :key="id" :id="id" :price="sell_price"
            :product_name="name"></Card>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import Card from "../components/Card";

export default {
  name: 'Home',
  components: {Card},
  data: function () {
    return {
      products: []
    }
  },
  methods: {
    getData: async function () {
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
      }

      await this.verifyToken();

      const token = localStorage.getItem("token_access")
      axios.get("https://ecommerce-aacjp-missiontic.herokuapp.com/api/products/", {headers: {"Authorization": `Bearer ${token}`}}).then((result) => {
        const products = result.data
        for (let i = 0; i < products.length; i++) {
          this.products.push(products[i])
        }
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
    addToCar: function (product) {
      let products = JSON.parse(localStorage.getItem("products"))
      if (products === null) products = []
      if (products.some(o => o.id === product.id)) {
        let _product = products.find(o => o.id === product.id)
        if (_product.quantity != null) _product.quantity++;
        else _product.quantity = 1;
      } else {
        product.quantity = 1;
        products.push(product)
      }
      localStorage.setItem("products", JSON.stringify(products));
      alert("Agregado al carrito")
    }
  },
  created: async function () {
    await this.getData()
  },
  meta: {title:'Tienda Virtual - Ciclo 3 MisionTic2022'}
}
</script>
<style scoped>
h1 {
  text-align: center;
}

.products {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: 1px 1px 5px;
  -moz-box-shadow: 1px 1px 5px;
  box-shadow: 1px 1px 5px;
  padding: 5% 5% 5% 5%;
  margin: 0 10% 0 10%;
  transition: all 0.5s;
}

</style>
