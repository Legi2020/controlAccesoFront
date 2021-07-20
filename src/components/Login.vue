<template>
  <div class="container" style="background-color: transparent">
    <div class="row mt-5">
      <div class="col-md-4 mx-auto">
        <div class="card text-center redondeado sombra">
          <div class="card-header">
            <img
              src="../assets/logo.png"
              alt="Colmed3"
              class="card-img-top mx-auto m-2 w-70"
            />
            <h5 class="text-uppercase text-dark">Iniciar Sesión</h5>
          </div>
          <div class="card-body">
            <form id="subscribeForm" @submit.prevent="login">
              <div class="form-group">
                <input
                  type="text"
                  id="id"
                  name="usuario"
                  placeholder="Ingrese nombre de usuario."
                  class="form-control"
                  v-model="user"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  v-model="password"
                  class="form-control"
                  placeholder="Ingrese contraseña."
                  required
                />
              </div>
              <div class="form-group">
                <input
                  class="btn btn-primary btn-block"
                  type="submit"
                  value="Iniciar sesión"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            user: '',
            password: '',
        }
    },
    methods: {
        login(){
            console.log(this.user);
            console.log(this.password);
        }
    }
};
</script>

<style>
.redondeado {
  border-radius: 10px;
}
.sombra {
  box-shadow: 6px 10px 31px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 6px 10px 31px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 10px 31px 0px rgba(0, 0, 0, 0.75);
}
</style>