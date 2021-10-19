<template>
  <div class="product_list">
    <span class="Title">Carrito</span>
    <div class="list">
      <Card_Cart v-for="{name,id,quantity,sell_price} in products" :key="id" :id="id"
                 :name="name" :quantity="quantity"
                 :sell_price="sell_price"/>
    </div>
    <div class="emptyCart" v-if="products.length <= 0">
      <h2>Tu carrito esta vacío</h2>
    </div>
    <div class="info" v-if="products.length > 0">
      <div class="titles">
        <span class="subtotal">Subtotal</span>
        <span>Iva (19%)</span>
        <span class="total">Total</span>
      </div>
      <div class="values">
        <span>$ {{ calculateSubtotal() }}</span>
        <span>$ {{ calculateIva() }}</span>
        <span>$ {{ calculateTotal() }}</span>
      </div>
      <div class="button">
        <button type="submit" class="btn btn-primary" v-if="products.length > 0" v-on:click="doOrder">Realizar Pedido
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Card_Cart from "../components/Card_Cart";
import axios from "axios";

export default {
  name: "Cart",
  components: {Card_Cart},
  data: function () {
    return {
      products: []
    }
  },
  methods: {
    calculateSubtotal: function () {
      const total = this.calculateTotal()
      return total - (total * 0.19)
    },
    calculateTotal: function () {
      let products = JSON.parse(JSON.stringify(this.products))
      let total = 0;
      for (const product in products) {
        let productE = products[product]
        total += productE.sell_price * productE.quantity
      }
      return total;
    },
    calculateIva: function () {
      const total = this.calculateTotal()
      return total * 0.19
    },
    verifyToken: async function () {
      return axios.post("https://ecommerce-aacjp-missiontic.herokuapp.com/refresh",
          {refresh: localStorage.getItem("token_refresh")}, {headers: {}}).then((result) => {
        localStorage.setItem("token_access", result.data.access);
      }).catch((error) => {
        this.$parent.logOut()
      })
    },
    createOrder: function () {
      let order = {}
      order.sells = []
      const products = JSON.parse(JSON.stringify(this.products))
      for (const product in products) {
        const sell = {
          product: products[product].id,
          product_quantity: products[product].quantity
        }
        order.sells.push(sell)
      }
      return order;
    },
    doOrder: function () {
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
      }
      this.verifyToken();

      let order = this.createOrder()

      const token = localStorage.getItem("token_access")
      axios.post("https://ecommerce-aacjp-missiontic.herokuapp.com/api/orders/create", order, {headers: {"Authorization": `Bearer ${token}`}}).then((result) => {
        alert(result.data.message)
        localStorage.setItem("products", null)
        this.products = []
      }).catch((error) => {
        console.error(error)
      })

    },
    fillProducts: function () {
      const products = JSON.parse(localStorage.getItem("products"))
      if (products != null) {
        for (const product of products) {
          this.products.push(product)
        }
      }
    },
    deleteProduct: function (i) {
      const index = this.products.findIndex(o => o.id === i)
      this.products.splice(index, 1)
      localStorage.setItem("products", JSON.stringify(this.products))
    },
    changeQuantity: function (id, quantity) {
      if (quantity < 1) quantity = 1
      const index = this.products.find(o => o.id === id)
      index.quantity = quantity
      localStorage.setItem("products", JSON.stringify(this.products))
    }
  },
  created: function () {
    this.fillProducts();
  }
}
</script>

<style scoped>
.product_list {
  min-height: 65vh;
  position: relative;
}

.Title {
  display: flex;
  justify-content: center;
  font-size: 1.5em;
  text-shadow: 1px 1px 1px;
  margin-bottom: 1em;
}

.info {
  margin: 2em 1em 1em;
  display: flex;
  gap: 2em;
  position: relative;
  font-size: 1.2em;
}

.titles {
  display: flex;
  flex-direction: column;
  gap: 1em

}

.values * {
  text-underline-offset: .3em;
}

.values {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.button {
  right: 0;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
}

.btn {
  padding: 1em;
  background-color: #5dd260;
  border-radius: 5px;
  border: 0;
  box-shadow: 1px 1px 15px #5da260;
  cursor: pointer;
  transition: all 0.2s;
  font-size: .9em;
}

.btn:hover {
  background-color: #50a852;
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -ms-transform: scale(1.05);
  -o-transform: scale(1.05);
  transform: scale(1.05);
}

.btn:active {
  background-color: #7bec7d;
}

.emptyCart {
  display: flex;
  font-family: Bahnschrift, serif;
  font-size: 1.2em;
  justify-content: center;
  align-items: center;
  height: 60vh;
}

.emptyCart h2 {
  padding: 1em;
  cursor: pointer;
}

.emptyCart h2:hover {
  animation-name: tilt-empty-cart;
  animation-duration: .9s;
  animation-iteration-count: infinite;
}

@keyframes tilt-empty-cart {
  25% {
    -webkit-transform: rotate(20deg);
    -moz-transform: rotate(20deg);;
    -ms-transform: rotate(20deg);;
    -o-transform: rotate(20deg);;
    transform: rotate(20deg);;
  }
  75% {
    -webkit-transform: rotate(-20deg);
    -moz-transform: rotate(-20deg);;
    -ms-transform: rotate(-20deg);;
    -o-transform: rotate(-20deg);;
    transform: rotate(-20deg);;
  }
}


</style>