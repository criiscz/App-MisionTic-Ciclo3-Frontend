<template>
<div class="card">
  <p>Producto: {{product_name}}<br>
  Precio: {{price}}</p>
  <a href="">Agregar a carrito</a>
</div>
</template>

<script>
export default {
  name: "Card",
  props : {
    product_name: String,
    price: Number
  }
}
</script>

<style scoped>
  .card {
    border-radius: 5px;
    margin: 5px;
    width:15em;
    height: 10em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    -webkit-box-shadow: 1px 1px 5px;
    -moz-box-shadow: 1px 1px 5px;
    box-shadow: 1px 1px 5px;
  }
</style>