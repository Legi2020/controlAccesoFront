<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-6 p-4 mx-auto">
        <h1 class="mb-4">Detalle: {{ this.nombreEmpleado }}</h1>
        <form @submit.prevent="getData()">
          <div class="form-group">
            <label for="fecha-desde-reporte">Fecha Desde</label>
            <input
              type="date"
              class="form-control"
              name="fechaDesde"
              id="fecha-desde-reporte"
              v-model="fechaDesde"
            />
          </div>
          <div class="form-group">
            <label for="fecha-hasta-reporte">Fecha Hasta</label>
            <input
              type="date"
              class="form-control"
              name="fechaHasta"
              id="fecha-hasta-reporte"
              v-model="fechaHasta"
            />
          </div>
          <input
            type="submit"
            class="btn btn-primary btn-lg rounded-lg"
            value="Buscar"
          />
        </form>
      </div>
    </div>
  </div>
  <div class="container bg-white p-5" v-if="this.ingresos.length == 0 && showMessage">
    <div class="row">
      <div class="col">
        <h2 class="text-center">No se encontraron resultados</h2>
      </div>
    </div>
  </div>
  <div class="container-fluid pr-5 pl-5" v-if="this.ingresos.length > 0 ">
    <div class="row tabla p-4">
      <div class="col-12 text-left p-4">
        <h4>Fecha Desde: {{ this.fechaDesde }}</h4>
        <h4>Fecha Hasta: {{ this.fechaHasta }}</h4>
        <h4>Cantidad Ingresos: {{ this.ingresos.length }}</h4>
        <h4>Cantidad Egresos: {{ this.egresos.length }}</h4>
      </div>
      <div class="col-5 p-0" v-if="ingresos.length > 0">
        <h1 class="p-3">Ingresos</h1>
        <table class="table">
          <thead class="text-center thead-dark">
            <tr>
              <th scope="col" class="align-middle">Fecha</th>
              <th scope="col" class="align-middle">Hora</th>
              <th scope="col" class="align-middle">Imagen</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ingreso in ingresos" :key="ingreso.id">
              <td class="align-middle text-center">{{ ingreso.fecha }}</td>
              <td class="align-middle text-center">
                {{ normalizarHora(ingreso.hora) }}
              </td>
              <td class="align-middle text-center">{{ imagen }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-6 offset-1 p-1" v-if="ingresos.length > 0">
        <h1 class="p-3">Egresos</h1>
        <table class="table">
          <thead class="text-center thead-dark">
            <tr>
              <th scope="col" class="align-middle">Fecha</th>
              <th scope="col" class="align-middle">Hora</th>
              <th scope="col" class="align-middle">Imagen</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="egreso in egresos" :key="egreso.id">
              <td class="align-middle text-center">{{ egreso.fecha }}</td>
              <td class="align-middle text-center">
                {{ normalizarHora(egreso.hora) }}
              </td>
              <td class="align-middle text-center">imagen</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Detalle",
  data() {
    return {
      ingresos: [],
      egresos: [],
      idEmpleado: null,
      empleado: null,
      fechaDesde: null,
      fechaHasta: null,
      showMessage: false,
    };
  },
  created(){
    this.idEmpleado = this.$route.params.id;
    this.nombreEmpleado = this.$route.params.nombre;
    
    console.log(this.nombreEmpleado)
  },
  mounted() {

  },
  methods: {
    normalizarHora(hora) {
      return hora.toString().substring(11, 16);
    },
    getIngresos() {
      axios
        .post(process.env.VUE_APP_API_ROUTE + "ingresos", {
          data: {
            id: this.idEmpleado,
            fechaDesde: this.fechaDesde,
            fechaHasta: this.fechaHasta,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.error == false) {
            this.ingresos = res.data.ingresos;
          }
        });
    },
    getEgresos() {
      axios
        .post(process.env.VUE_APP_API_ROUTE + "egresos", {
          data: {
            id: this.idEmpleado,
            fechaDesde: this.fechaDesde,
            fechaHasta: this.fechaHasta,
          },
        })
        .then((res) => {
          if (res.data.error == false) {
            this.egresos = res.data.egresos;
          }
        });
    },
    getData() {
      if (!this.fechaDesde || !this.fechaHasta) {
        return this.$swal({
          icon: "warning",
          title: "Atención",
          text: "Ambas fechas son obligatorias",
          confirmButtonColor: "black",
          confirmButtonText: "Cerrar",
        });
      }

      if (this.fechaDesde > this.fechaHasta) {
        return this.$swal({
          icon: "warning",
          title: "Atención",
          text: "La fecha hasta debe ser mayor a la fecha desde",
          confirmButtonColor: "black",
          confirmButtonText: "Cerrar",
        });
      }
      this.getIngresos();
      this.getEgresos();
      this.showMessage = true;
    }
  },
};
</script>

<style>
</style>