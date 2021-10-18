<template>
  <div class="card">
    <div class="titles">
      <span class="text">Nombre Producto</span>
      <span class="text">Cantidad</span>
      <span class="text">Precio</span>
    </div>
    <div class="items">
      <span class="name text">{{ name }}</span>
      <input type="number" min="1" class="quantity" v-model="quantity" v-on:change="$parent.changeQuantity(id, quantity)">
      <span class="price text">${{ sell_price }}</span>
      <span class="delete button" v-on:click="$parent.deleteProduct(id)"><img src="@/assets/delete-icon.png" alt=""></span>
    </div>

  </div>
</template>

<script>
export default {
  name: "Card_Cart",
  props: {
    id: Number,
    name: String,
    quantity: Number,
    sell_price: Number
  },
}
</script>

<style scoped>
.card {
  box-shadow: 1px 1px 5px;
  padding: 1em;
  margin: 0.5em 0;
  border-radius: 0.5em;
  position: relative;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.card:hover {
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -ms-transform: scale(1.05);
  -o-transform: scale(1.05);
  transform: scale(1.05);
}

.titles {
  font-weight: lighter;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1em;
  text-align: center;
  margin-bottom: 1em;
}

.items {
  font-weight: bold;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1em;
  text-align: center;
  place-items: center;
}

.delete {
  position: absolute;
  right: 3em;
  top: 40%;
  cursor: pointer;
}

.delete img {
  width: 20px;
  object-fit: cover;
  transition: transform .5s;
}

.delete:hover img {
  transform: scale(1.5);
  filter: hue-rotate(120deg);
}

.delete:active img {
  transform: scale(1)
}

.quantity {
  width: 3em;
  font-weight: bold;
}


</style>