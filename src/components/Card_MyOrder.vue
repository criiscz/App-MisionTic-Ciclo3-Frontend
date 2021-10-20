<template>
  <div class="body">
    <div class="card">
      <div class="titles">
        <h4>Id</h4><h4>Precio Total</h4><h4>Fecha</h4><h4>Estado</h4>
      </div>
      <div class="values">
        <h4>{{ id }}</h4>
        <h4>${{ calculateTotalPrice() }}</h4>
        <h4>{{ getDateFormatted() }}</h4>
        <h4 v-bind:style="{color: defineColor()}">{{ status }}</h4>
      </div>
      <div class="buttons">
        <div class="buttons-group">

          <button class="delete-btn btn" v-on:click="deleteOrder()">Delete</button>
          <button v-if="status !== 'Entregado'" class="changeStatus btn" v-on:click="changeOrderStatus()">
            Entregado!
          </button>
          <button class="see-detail btn" v-on:click=" $parent.fillData(
              JSON.stringify({
                sells:this.sells,
                total:this.calculateTotalPrice(),
                order_status:this.order_status
              }
          )); $parent.toggleModal()">
            Ver detalle
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ref} from "vue";

export default {
  name: "Card_MyOrder",
  props: {
    id: Number,
    sells: Array,
    order_date: Date,
    order_status: ""
  },
  methods: {
    calculateTotalPrice: function () {
      let total = 0
      for (const sell in this.sells) {
        const price = this.sells[sell].product.sell_price
        const quantity = this.sells[sell].product_quantity
        total += price * quantity
      }
      return total;
    },
    getDateFormatted: function () {
      const date = new Date(this.order_date)
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    },
    defineColor: function () {
      if (this.status === 'En Espera') return '#50ba26'
      else if (this.status === 'Entregado') return '#2ea1ff'
      else if (this.status === 'Cancelado') return '#310202'
      else if (this.status === 'En Ruta') return '#d5783c'
    },
    deleteOrder: function () {
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
      }
      this.$parent.verifyToken()
      const token = localStorage.getItem("token_access")
      axios.delete("https://ecommerce-aacjp-missiontic.herokuapp.com/api/orders/delete/" + this.id, {headers: {'Authorization': `Bearer ${token}`}}
      ).then((result) => {
        this.$parent.getData()
        alert(result.data.detail);
      }).catch(error => {
        console.error(error)
      })
    },
    changeOrderStatus: function () {
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
      }
      this.$parent.verifyToken()
      const token = localStorage.getItem("token_access")

      axios.patch("https://ecommerce-aacjp-missiontic.herokuapp.com/api/orders/update/status/" + this.id,
          {order_status: 3},
          {headers: {'Authorization': `Bearer ${token}`}}
      ).then(result => {
        this.status = result.data.order_status;

      }).catch(error => {
        console.error(error)})
    }

  },
  setup(props) {
    let status = ref(props.order_status)
    return {status}
  }
}
</script>

<style scoped>
.card {
  border-radius: 5px;
  box-shadow: 1px 1px 5px #999;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: .5em;
  cursor: pointer;
  width: 40vw;
}

.card:hover {
  -webkit-transform: scale(1.03);
  -moz-transform: scale(1.03);
  -ms-transform: scale(1.03);
  -o-transform: scale(1.03);
  transform: scale(1.03);
}

.titles, .values {
  font-family: "Segoe UI", serif;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  height: 2.5em;
}

.titles {
  font-weight: lighter;
  font-size: 14px;
  color: #555;
}

.values {
}

.buttons {
  margin-top: 3em;
  position: relative;
}

.buttons-group {
  position: absolute;
  bottom: 0;
  right: 0;
}

.btn {
  background-color: transparent;
  border: none;
  margin: 0 1em;
  padding: 5px 0;
  transition: all .2s;
  position: relative;
  cursor: pointer;
}

.see-detail {
  color: #0015AA;
}

.btn:hover {
  transform: translateY(-1px);
  text-decoration: underline;
}

.changeStatus {
  color: #2b9912;
}

.red {
  color: red;
}


</style>