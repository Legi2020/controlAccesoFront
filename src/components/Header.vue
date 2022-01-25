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
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <router-link @click="isLogueado" to="/" active-class="active" class="nav-link"
              >Inicio</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <router-link
              @click="isLogueado"
              to="/informe"
              active-class="active"
              class="nav-link"
              v-if="logueado === 'true'"
              >Informe</router-link
            >
          </li>
           <li class="nav-item dropdown">
            <router-link
              @click="isLogueado"
              to="/administracion"
              active-class="active"
              class="nav-link"
              v-if="logueado === 'true'"
              >Administración</router-link
            >
          </li>
        </ul>
        <span class="navbar-text">
          <router-link
            @click="isLogueado"
            to="/login"
            active-class="active"
            class="nav-link text-right"
            v-if="logueado === 'false'"
            >Iniciar Sesion</router-link
          ></span
        >
        <span class="navbar-text">
          <router-link
            @click="logout"
            to="/login"
            active-class="active"
            class="nav-link"
            v-if="logueado === 'true'"
            >Salir</router-link
          ></span
        >
      </div>
    </nav>
  </header>
</template>

<script>

export default {
  name: "Header",
  data() {
    return {
      logueado: localStorage.getItem("logueado"),
    };
  },
  methods: {
    logout() {
      localStorage.setItem("token", "");
      localStorage.setItem("logueado", false);
      this.isLogueado();
      this.$router.push({ path: "/login" });
    },
    isLogueado() {
      this.logueado = localStorage.getItem("logueado");
      return this.logueado;
    },
  },
   beforeUpdate() {
    this.isLogueado();
  }
};
</script>

<style>
.nav-link {
  font-size: 15px;
}
</style>
