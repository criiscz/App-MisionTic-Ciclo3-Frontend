<template>
  <div class="noPedidos" v-if="orders.length <= 0">
    No tienes pedidos
  </div>
  <div class="body" v-if="orders.length > 0">
    <Modal @close="toggleModal" :modal-active="modalActive" class="modal" :sells="json_data.sells"
           :total="json_data.total" :status="json_data.order_status">
    </Modal>
    <div class="items">

      <div class="head">
      <span class="title">
        Mis pedidos
      </span>
      </div>
      <div class="main">
        <Card_MyOrder
            v-for="{id, date_order,order_status,sells} in orders"
            :key="id" :id="id" :order_date="new Date(date_order)"
            :order_status="order_status" :sells="sells"/>
      </div>
    </div>
  </div>


</template>

<script>
import Card_MyOrder from "../../components/Card_MyOrder";
import axios from "axios";
import {ref} from "vue";
import Modal from "../../components/Modal";
import DetailsOrder_ModalInfo from "../../components/DetailsOrder_ModalInfo";

export default {
  name: "MyOrders",
  components: {DetailsOrder_ModalInfo, Modal, Card_MyOrder},
  data: function () {
    return {
      json_data: {},
      orders: []
    }
  },
  methods: {
    getData: function () {
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
      }
      this.verifyToken();

      const token = localStorage.getItem("token_access")
      axios.get("https://ecommerce-aacjp-missiontic.herokuapp.com/api/orders/current/",
          {headers: {"Authorization": `Bearer ${token}`}}).then((result) => {
        this.orders = result.data
      }).catch((error) => {
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
    fillData: function (json_data) {
      this.json_data = JSON.parse(json_data)
    }
  },
  setup() {
    const modalActive = ref(false)
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    }

    return {modalActive, toggleModal}
  },
  created: function () {
    this.getData()
  }
}
</script>

<style scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 60vh;
  overflow: visible;
  overflow-x: hidden;
  margin-top: 2em;
  padding: 1em;
  width: 80%;
  align-items: center;
  -ms-overflow-style: none;
}

.main:hover {
  box-shadow: inset 0 0 1px black;
}

.main::-webkit-scrollbar {
  width: 5px;
}

.main:hover .main::-webkit-scrollbar {
  width: 5px;
  background: #eee;
}

.main:hover .main::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 20px;
}

.main::-webkit-scrollbar-thumb {

}

.body {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 5em;
}

.head {
  margin-top: 3em;
  display: flex;
  width: 80%;
  position: relative;
  justify-content: center;
}

.items {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  margin: 0 .5em;
  font-size: 1.3em;
  font-family: "Segoe UI Semibold",serif;
}

.modal {
  z-index: 1000;
}

</style>