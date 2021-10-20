<template>
  <div class="body">
    <div class="page">
      <div class="aside">
        <button class="option" v-on:click="activeProfile(); loadProfile() " v-bind:class="{active : isProfileActive}">
          Perfil
        </button>
        <button class="option" v-on:click="activeOrder(); loadOrder() " v-bind:class="{active : isOrderActive}">Mis
          pedidos
        </button>
      </div>
      <div class="main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import {ref} from "vue";
export default {
  name: "Account",
  components: {Modal},
  data: function () {
    return {
      isProfileActive: true,
      isOrderActive: false,
    }
  },
  methods: {
    activeProfile: function () {
      this.isProfileActive = true;
      this.isOrderActive = false
    },
    activeOrder: function () {
      this.isOrderActive = true
      this.isProfileActive = false

    },
    loadProfile: function () {
      this.$router.push({name: "profile"})
    },
    loadOrder: function () {
      this.$router.push({name: "myorders"})
    },

  },
  created: function () {
    this.loadProfile()
  }
}
</script>

<style scoped>
.aside {
  width: 20em;
  position: relative;
  top: 0;
  box-shadow: 4px 0 5px -5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 78vh;
  background: transparent;
}

.option {
  margin: 1em 3em;
  height: 3em;
  background-color: white;
  border: 2px solid #5c8dcd;
  border-radius: 5px;
}

.active {
  background-color: #5c8dcd;
}

.body {
  width: 100%;
}

.page {
  position: relative;
  display: flex;
}

.main {
  position: relative;
  display: flex;
  width: 100%;
  top: 0;
  justify-content: center;
}

.modal-content {
  display: flex;
  flex-direction: column;

}

</style>