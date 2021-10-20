<template>
  <div class="row">
    <table>
      <tr>
        <td class="title">Id Orden</td>
        <td class="title">Id Cliente</td>
        <td class="title">Nombre</td>
        <td class="title">Apellido</td>
        <td class="title">Fecha Orden</td>
        <td class="title">Status orden</td>
        <td class="title">Total a pagar</td>
        <td class="title">Productos</td>
      </tr>
      <tr>
        <td class="cell">{{ order_id }}</td>
        <td class="cell">{{ cli_id }}</td>
        <td class="cell">{{ cli_name }}</td>
        <td class="cell">{{ cli_surname }}</td>
        <td class="cell">{{ date_order }}</td>
        <td class="cell">{{ order_status }}</td>
        <td class="cell">${{ total }}</td>
        <td class="cell">
          <button>Productos</button>
        </td>
      </tr>
    </table>    
  </div>
</template>

<script>
export default {
  name: "Row_Order",
  props: {
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
</script>

<style scoped>
table {
  width: 80%;
  border: 1px solid;
}

.title {
  font-weight: bold;
  background-color: #1af;
  padding: 10px;
  border: 0;
  align: center;
}
.cell {
  text-align: left;
  vertical-align: top;
  border: 1px solid #000;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn-sells {
  background-color: #3ef;
  padding: 10px;
  border-radius: 10px;
  margin: 2px;
  cursor: pointer;
}

.btn-sells:hover {
  background-color: #3af;
}

.btn-sells:active {
  background-color: #39f;
}
</style>
