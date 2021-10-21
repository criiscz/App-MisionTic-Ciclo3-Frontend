<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
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
                  <p>${{ product.sell_price }}</p>
                  <p>{{ product_quantity }}</p>
                </div>
              </div>
            </div>
            <div class="info">
              <div class="container">
                <div class="titles">
                  <p>Subtotal</p>
                  <p>Iva(19%)</p>
                  <p>Total</p>
                  <p>Estado</p>
                </div>
                <div class="values">
                  <p>${{ calculateSub() }}</p>
                  <p>${{ calculateIva() }}</p>
                  <p>${{ calculateTotal() }}</p>
                  <p>{{ status }}</p>
                </div>
              </div>
            </div>
            <button v-on:click="close" type="button" class="btn btn-close">
              Aceptar
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    modalActive: Boolean,
    sells: Array,
    total: Number,
    status: String
  },
  methods: {
    calculateTotal: function () {
      return this.total;
    },
    calculateIva: function () {
      return this.total * .19;
    },
    calculateSub: function () {
      return this.total - (this.total * .19)
    }
  },

  setup(props, {emit}) {
    const close = () => {
      emit("close");
    };

    return {close};
  },
};
</script>

<style scoped lang="scss">
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);


  .modal-inner {
    border-radius: 10px;
    position: relative;
    max-width: 30em;
    max-height: 40em;
    width: 80%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    padding: 64px 16px;
  }
}

.modal .modal-inner button {
  padding: 15px 15px;
  border: none;
  border-radius: 1em;
  background-color: #0bf;
  color: #000;
  cursor: pointer;
  font-family: "Segoe UI Semibold", serif;
  font-size: 20px;
  transform: scale(0.8);
  -webkit-transition: all .3s;
  -moz-transition: all .3s;
  -o-transition: all .3s;
  transition: all .3s;

  &:hover {
    transform: scale(1);
    background-color: #55ba6c;
  }
}

.body {

  .table {
    padding: 10px;
    box-shadow: inset 0 0 3px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: auto;
    overflow-x: auto;
    max-height: 10em;
    min-height: 8em;
    font-family: "Segoe UI", serif;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: #aaa;
        border-radius: 20px;
      }

    }


    .header,
    .sell {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      place-items: center;
    }

    .header {
      padding: 0;
      border-radius: 1em;
      background-color: #d4d4d4;
      box-shadow: 1px 1px 5px #888;

      p {
        font-size: 15px;
        padding: .3em;
        margin: 0;
      }
    }

    .items {
      margin-top: .5em;
      position: relative;
      font-family: "Segoe UI Light", serif;

      .sell {
        font-weight: 500;
        position: relative;

        p {
          font-size: 15px;

          text-align: center;
          border-radius: 1em;
          width: 5em;
          padding: .2em .5em;
          margin: .1em;
        }
      }
    }

  }

  .info {
    position: relative;
    font-family: "Segoe UI Light", serif;

    .container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      .values {
        text-align: right;
        margin-right: .5em;
      }
    }

  }

}
</style>