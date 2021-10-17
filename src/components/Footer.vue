<template>
  <div class="footer">
    <img src="https://lancetalent.com/wp-content/uploads/2017/05/ecommerceok.png" alt="Logo tienda">
    <div class="links">
      <a href="#">Contacto</a>
      <a href="#">Acerca de nosotros</a>
    </div>
    <div class="social-media">
      <p>Siguenos</p>
      <div class="icons">
        <img src="" class="img-icon" alt="">
        <img src="" class="img-icon" alt="">
        <img src="" class="img-icon" alt="">
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
  .footer{
    display: flex;
    box-shadow: 1px -1px 20px #aaa;
    width: 100vw;
    height: 150px;
    margin-left: -8px;
    margin-bottom: 0;
  }

  .links {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    padding: 20px;
  }

  .social-media {
    background-color: white;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>