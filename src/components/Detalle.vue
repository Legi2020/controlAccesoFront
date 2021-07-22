<template>
  <div class="container">
    <div class="row mt-3 bg-white redondeado sombra">
      <div class="col-12">
        <h1 class="p-4 text-center" v-if="this.empleado">
          Detalle: {{ this.empleado.nombre }}
        </h1>
        <hr />
      </div>
      <div class="col-12">
        <form @submit.prevent="getData()">
          <div class="row p-2">
            <div class="col-6">
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
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="fecha-desde-reporte">Hora ingreso</label>
                <input
                  type="time"
                  class="form-control"
                  name="horaIngreso"
                  v-model="horaIngreso"
                />
              </div>
              <div class="form-group">
                <label for="fecha-desde-reporte">Hora egreso</label>
                <input
                  type="time"
                  class="form-control"
                  name="horaEgreso"
                  v-model="horaEgreso"
                />
              </div>
            </div>
            <div class="col-12 mb-4">
              <input
                type="submit"
                class="btn btn-primary btn-lg rounded-lg"
                value="Buscar"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div
    class="container bg-white p-3 mt-5 redondeado sombra"
    v-if="this.ingresos.length == 0 && showMessage"
  >
    <div class="row">
      <div class="col">
        <h2 class="text-center">No se encontraron resultados</h2>
      </div>
    </div>
  </div>
  <div class="container-fluid pr-5 pl-5" v-if="this.ingresos.length > 0">
    <div class="row tabla p-4">
      <div class="col-12 text-left p-4">
        <h4>
          Fecha Desde: <span>{{ this.fechaDesde }}</span>
        </h4>
        <h4>
          Fecha Hasta: <span>{{ this.fechaHasta }}</span>
        </h4>
        <h4>
          Cantidad Ingresos:<span>{{ this.ingresos.length }}</span>
        </h4>
        <h4>
          Cantidad Egresos: <span>{{ this.egresos.length }}</span>
        </h4>
        <h4 v-if="this.retrasoIngreso">
          Retraso Ingreso:
          <span
            >{{ this.retrasoIngreso.tiempo }} {{ this.retrasoIngreso.unidad }} /
            {{ minToHour(this.retrasoIngreso.tiempo) }} hs
          </span>
        </h4>
        <h4 v-if="this.retrasoEgreso">
          Tiempo extra:
          <span
            >{{ this.retrasoEgreso.tiempo }} {{ this.retrasoEgreso.unidad }} /
            {{ minToHour(this.retrasoEgreso.tiempo) }} hs
          </span>
        </h4>
      </div>
      <div class="col-6 p-0" v-if="ingresos.length > 0">
        <h1 class="p-3">Ingresos</h1>
        <table class="table mx-auto">
          <thead class="text-center thead-dark">
            <tr>
              <th scope="col" class="align-middle">Fecha</th>
              <th scope="col" class="align-middle">Hora</th>
              <th scope="col" class="align-middle">Nota</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ingreso in ingresos" :key="ingreso.id">
              <td class="align-middle text-center">
                {{ formatDate(ingreso.fecha) }}
              </td>
              <td class="align-middle text-center">
                {{ normalizarHora(ingreso.hora) }}
              </td>
              <td class="align-middle text-center max-ancho">
                {{ ingreso.nota }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-6 p-0" v-if="egresos.length > 0">
        <h1 class="p-3">Egresos</h1>
        <table class="table">
          <thead class="text-center thead-dark">
            <tr>
              <th scope="col" class="align-middle">Fecha</th>
              <th scope="col" class="align-middle">Hora</th>
              <th scope="col" class="align-middle">Nota</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="egreso in egresos" :key="egreso.id">
              <td class="align-middle text-center">
                {{ formatDate(egreso.fecha) }}
              </td>
              <td class="align-middle text-center">
                {{ normalizarHora(egreso.hora) }}
              </td>
              <td class="align-middle text-center max-ancho">
                {{ egreso.nota }}
              </td>
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
      empleado: "",
      fechaDesde: null,
      fechaHasta: null,
      horaIngreso: null,
      horaEgreso: null,
      retrasoIngreso: null,
      retrasoEgreso: null,
      showMessage: false,
    };
  },
  created() {
    this.idEmpleado = this.$route.params.id;
    this.getEmpleado();
  },
  mounted() {},
  methods: {
    normalizarHora(hora) {
      return hora.toString().substring(11, 16);
    },
    getEmpleado() {
      axios
        .get(process.env.VUE_APP_API_ROUTE + "empleado/" + this.idEmpleado)
        .then((res) => {
          console.log(res);
          this.empleado = res.data.empleados;
        });
    },
    getIngresos() {
      axios
        .post(process.env.VUE_APP_API_ROUTE + "ingresos", {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            id: this.idEmpleado,
            fechaDesde: this.fechaDesde,
            fechaHasta: this.fechaHasta,
            horaIngreso: this.horaIngreso,
            horaEgreso: this.horaEgreso,
          },
        })
        .then((res) => {
          if (res.data.error == false) {
            this.ingresos = res.data.ingresos;
            this.retrasoIngreso = res.data.retraso;
          }
        });
    },
    getEgresos() {
      axios
        .post(process.env.VUE_APP_API_ROUTE + "egresos", {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            id: this.idEmpleado,
            fechaDesde: this.fechaDesde,
            fechaHasta: this.fechaHasta,
            horaEgreso: this.horaEgreso,
          },
        })
        .then((res) => {
          if (res.data.error == false) {
            this.egresos = res.data.egresos;
            this.retrasoEgreso = res.data.tiempoExtra;
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
          text: "Fecha Hasta debe ser mayor a Fecha Desde",
          confirmButtonColor: "black",
          confirmButtonText: "Cerrar",
        });
      }
      this.getIngresos();
      this.getEgresos();
      this.showMessage = true;
    },
    formatDate(date) {
      return date.split("T")[0];
    },
    minToHour(min) {
      return (min / 60).toFixed(2);
    },
  },
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

.max-ancho {
  max-width: 150px;
  word-wrap: break-word;
  text-align: justify !important;
}

h4 {
  text-transform: capitalize;
}

span {
  color: grey;
}
</style>