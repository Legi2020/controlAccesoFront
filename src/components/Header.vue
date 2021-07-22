<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#"><img src="../assets/logo.png" /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" active-class="active" class="nav-link"
              >Inicio</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/informe"
              active-class="active"
              class="nav-link"
              v-if="logueado"
              >Informe</router-link
            >
          </li>
          <li class="nav-item">
            <router-link  @click="logout" to='/login' class="nav-link" v-if="logueado"
              >Salir</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/login"
              class="nav-link"
              v-if="!logueado"
              >Iniciar Sesion</router-link
            >
          </li>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      logueado: false,
    };
  },
  mounted(){
     this.isLogueado();
     this.$forceUpdate();
  },
 methods: {
   logout(){
     localStorage.removeItem('token');
     localStorage.removeItem('logueado');
     this.$router.redirect('login');
   },
   isLogueado(){
      this.logueado = localStorage.getItem("logueado")
   }
 }
};
</script>

<style>
.nav-link {
  font-size: 15px;
}
</style>
