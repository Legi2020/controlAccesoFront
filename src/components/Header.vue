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
            <router-link to="/informe" active-class="active" class="nav-link"
              >Informe</router-link
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
  props: {
    msg: String,
  },
};
</script>

<style>
.nav-link{
  font-size: 15px;
}
</style>
