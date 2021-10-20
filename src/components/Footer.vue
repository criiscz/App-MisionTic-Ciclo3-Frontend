<template>
  <div class="footer">
    <img src="https://lancetalent.com/wp-content/uploads/2017/05/ecommerceok.png" alt="Logo tienda">
    <div class="links">
    </div>
    <div class="social-media">
      <p>Proyecto práctico para Ciclo 3 del programa MisionTic2022 ofrecido por el Ministerio de Tecnologías de la Información de Colombia</p>
      <p>Integrantes Involucrados en la creación del presente aplicativo</p>
      <div class="icons">
        <img src="" class="img-icon" alt="">Cristian Leonardo Sánchez Rivera
        <img src="" class="img-icon" alt=""><span>- - </span>
        <img src="" class="img-icon" alt="">Joel Samir Hernandez Gómez
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
    height: 250px;
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