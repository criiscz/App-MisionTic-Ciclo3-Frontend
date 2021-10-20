<template>
  <div class="order">
    <h1>Orden</h1>

    <form v-on:submit.prevent="getData">
      <input type="text" v-model="input_id" placeholder="Id de la orden" />
      <button type="submit">Consultar</button>
    </form>
    
    <br />
    <Modal @close="toggleModal" :modal-active="modalActive" class="modal" :sells="json_data.sells"
           :total="json_data.total" :status="json_data.order_status">
    </Modal>
    <div class="order_table">
      <Row_Order
        :order_id="order.order_id"
        :cli_id="order.cli_id"
        :cli_name="order.cli_name"
        :cli_surname="order.cli_surname"
        :date_order="order.date_order"
        :order_status="order.order_status"
        :total="order.total"
        :sells="sells"
      >
      </Row_Order>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Row_Order from "../components/Row_Order";
import Modal from "../components/Modal";
import {ref} from "vue";

export default {
  name: "Order",
  components: {Modal, Row_Order },
  data: function() {
    return {
      json_data: {},
      input_id: "",
      sells:[],
      order: {
        order_id: "",
        cli_id: "",
        cli_name: "",
        cli_surname: "",
        date_order: "",
        order_status: "",
        total: 0,
        order_sells: "",
      },
    };
  },
  methods: {
    getData: async function() {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
      }

      await this.verifyToken();

      const token = localStorage.getItem("token_access");
      axios
        .get(
          "https://ecommerce-aacjp-missiontic.herokuapp.com/api/orders/" +
            this.input_id,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((result) => {
          const order = result.data;
          this.sells = order.sells
          this.order.order_id = order.id;
          this.order.cli_id = order.client.id;
          this.order.cli_name = order.client.name;
          this.order.cli_surname = order.client.surname;
          this.order.date_order =
            order.date_order.substring(0, 10) +
            " " +
            order.date_order.substring(11, 16);
          this.order.order_status = order.order_status;
          this.order.order_sells = order.sells;
          this.order.total = 0;
          for (let i in this.order.order_sells) {
            this.order.total =
              this.order.total +
              this.order.order_sells[i].product_quantity *
                this.order.order_sells[i].product.sell_price;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    verifyToken: function() {
      return axios
        .post(
          "https://ecommerce-aacjp-missiontic.herokuapp.com/refresh",
          { refresh: localStorage.getItem("token_refresh") },
          { headers: {} }
        )
        .then((result) => {
          localStorage.setItem("token_access", result.data.access);
        })
        .catch((error) => {
          this.$emit("logOut");
        });
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
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
form {
  text-align: center;
}

button {
  background-color: #3ef;
  padding: 10px;
  border-radius: 10px;
  margin: 2px;
  cursor: pointer;
}
</style>
