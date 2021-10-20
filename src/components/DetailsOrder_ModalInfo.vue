<template>
  <div class="body">
    <h3>Products</h3>
    <div class="table">
      <div class="header">
        <p>Nombre</p>
        <p>Precio</p>
        <p>Cantidad</p>
      </div>
      <div class="items">
        <div v-for="{product, product_quantity} in sells" class="sell">
          <p>{{ product.name }}</p>
          <p>{{ product.sell_price }}</p>
          <p>{{ product_quantity }}</p>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="titles">
        <p>Subtotal</p>
        <p>Iva(19%)</p>
        <p>Total</p>
        <p>Estado</p>
      </div>
      <div class="values">
        <p>{{ calculateSub }}</p>
        <p>{{ calculateIva }}</p>
        <p>{{ calculateTotal }}</p>
        <p>{{status}}</p>
      </div>
    </div>
    <button v-on:click="" type="button">ss</button>

    <button type="button" class="btn btn-close">
      Aceptar
    </button>
  </div>
</template>

<script>
export default {
  name: "DetailsOrder_ModalInfo",
  props: {
    sells: Array,
    total: Number,
    status: String
  },
  methods: {
    calculateTotal : function (){

    },
    calculateIva:function() {

    },
    calculateSub:function() {

    }
  },
  setup(props, {emit}) {
    const close = () => {
      emit("close");
    };

    return {close};
  },
}
</script>

<style scoped>

</style>