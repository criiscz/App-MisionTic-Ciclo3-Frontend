<template>
  <button class="btn btn-nav">{{ msg }}</button>
</template>

<script>
export default {
  name: "Button_Nav",
  props: {
    msg: String,
  }
}
</script>

<style scoped>
  .btn-nav {
    background-color: #3EF;
    padding: 10px;
    border: 0;
    border-radius: 10px;
    margin: 2px;
    width: 100px;
    cursor: pointer;
  }

  .btn-nav:hover {
    background-color: #3AF;
  }

  .btn-nav:active {
    background-color: #39F;
  }
</style>