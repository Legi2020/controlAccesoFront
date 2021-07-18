<template>
  <footer class="page-footer font-small pt-4" style="background-color: #1d1f1e">
    <div class="footer-copyright text-center py-3" style="color: whitesmoke">
      © 2021 Colegio de Medicos Distrito III Prov. de Buenos Aires
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
footer {
  position: fixed;
  bottom: 0;
  clear: both;
  width: 100%;
  height: 100px;
}
</style>
