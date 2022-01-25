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
  <div
    class="container-fluid pr-5 pl-5"
    id="export"
    v-if="this.ingresos.length > 0"
  >
    <div class="row tabla p-4">
      <div class="col-12 text-left p-4">
         <h4>
          Empleado: <span> {{ empleado.apellido }} {{ empleado.nombre }}</span>
        </h4>
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
        <a
          type="button"
          download="logo.gif"
          @click="exportar('export', this.empleado.nombre)"
          class="btn btn-primary btn-md rounded-lg"
          value="Exportar"
        >
          Exportar
        </a>
      </div>
      <div class="col-6 p-0" v-if="ingresos.length > 0">
        <h1 class="p-3">Ingresos</h1>
        <table class="table mx-auto table-bordered table-striped table-hover">
          <thead class="text-center thead-dark">
            <tr>
              <th scope="col" class="align-middle">Fecha</th>
              <th scope="col" class="align-middle">Hora</th>
              <th scope="col" class="align-middle">Nota</th>
              <th scope="col" class="align-middle">Nota Administrador</th>
              <th scope="col" class="align-middle">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ingreso in ingresos" :key="ingreso.id">
              <td class="align-middle text-center">
                {{ formatDate(ingreso.fecha) }}
              </td>
              <td  v-if="ingreso.hora" class="align-middle text-center">
                {{ normalizarHora(ingreso.hora) }}
              </td>
              <td v-else class="align-middle text-center">Sin registrar</td>
              <td class="align-middle text-center max-ancho">
                {{ ingreso.nota }}
              </td>
              <td class="align-middle text-center max-ancho">
                {{ ingreso.notaAdmin }}
              </td>
              <td class="align-middle text-center">
                <button
                  type="button"
                  @click="addNotaAdminIngreso(ingreso.id)"
                  class="align-middle text-center btn btn-primary btn-lg rounded-lg"
                >
                  AGREGAR NOTA ADMINISTRADOR
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-6 p-0" v-if="egresos.length > 0">
        <h1 class="p-3">Egresos</h1>
        <table class="table table-bordered table-striped table-hover">
          <thead class="text-center thead-dark">
            <tr>
              <th scope="col" class="align-middle">Fecha</th>
              <th scope="col" class="align-middle">Hora</th>
              <th scope="col" class="align-middle">Nota</th>
              <th scope="col" class="align-middle">Nota Administrador</th>
              <th scope="col" class="align-middle">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="egreso in egresos" :key="egreso.id">
              <td class="align-middle text-center">
                {{ formatDate(egreso.fecha) }}
              </td>
              <td  v-if="egreso.hora" class="align-middle text-center">
                {{ normalizarHora(egreso.hora) }}
              </td>
              <td v-else class="align-middle text-center">Sin registrar</td>
              <td class="align-middle text-center max-ancho">
                {{ egreso.nota }}
              </td>
              <td class="align-middle text-center max-ancho">
                {{ egreso.notaAdmin }}
              </td>
                <td class="align-middle text-center">
                <button
                  type="button"
                  @click="addNotaAdminEgreso(egreso.id)"
                  class="align-middle text-center btn btn-primary btn-lg rounded-lg"
                >
                  AGREGAR NOTA ADMINISTRADOR
                </button>
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
      uri: "data:application/vnd.ms-excel;base64,",
      template:
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64: function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      },
      format: function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p];
        });
      },
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
    exportar(table, name) {
      table = document.getElementById(table);
      let fileName = this.empleado.apellido+' '+this.empleado.nombre+'_'+this.fechaDesde+'_'+this.fechaHasta;
      var ctx = { worksheet: name || "Worksheet", table: table.innerHTML };
        var a = document.createElement('a');
        a.href = this.uri + this.base64(this.format(this.template, ctx));
        a.download = fileName + '.xls';
        a.click();
    },
    addNotaAdminIngreso(ingresoId){
      this.$swal
        .fire({
          input: "textarea",
          title: 'Agregar nota',
          inputLabel: "Agregue una nota",
          confirmButtonText: `Confirmar`,
          cancelButtonText: `Cancelar`,
          showCancelButton: true,
          confirmButtonColor: "black",
          cancelButtonColor: "black",
        })
        .then((res) => {
          if (res.isDismissed) {
            return;
          }
          let nota = res.value;
          axios
            .put(process.env.VUE_APP_API_ROUTE + "ingreso/nota", {
              headers: {
                "Content-Type": "application/json",
                apiKey:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFwbGljYWNpb24gaG9yYXJpb3MgY29sbWVkMyBmaXJtZURpZ2l0YWwiLCJhcHAiOjE1MTYyMzkwMjJ9.dQcQMKVqJMqKlrpTCJ7Vq5KGwN3gBnTHRma85IVIt5U",
              },
              data: {
                idIngreso: ingresoId,
                notaAdmin: nota,
              },
            })
            .then((res) => {
              if (res.data.error === false) {
                return this.$swal({
                  icon: "success",
                  title: "Éxito",
                  text: "Por favor realice la busqueda nuevamente para ver los cambios",
                  confirmButtonColor: "black",
                  confirmButtonText: "Cerrar",
                });
              }
              return this.$swal({
                icon: "warning",
                title: "Atención",
                text: res.data.message,
                confirmButtonColor: "black",
                confirmButtonText: "Cerrar",
              });
            });
        });
  },
  addNotaAdminEgreso(egresoId){
      this.$swal
        .fire({
          input: "textarea",
          title: 'Agregar nota',
          inputLabel: "Agregue una nota",
          confirmButtonText: `Confirmar`,
          cancelButtonText: `Cancelar`,
          showCancelButton: true,
          confirmButtonColor: "black",
          cancelButtonColor: "black",
        })
        .then((res) => {
          if (res.isDismissed) {
            return;
          }
          let nota = res.value;
          axios
            .put(process.env.VUE_APP_API_ROUTE + "egreso/nota", {
              headers: {
                "Content-Type": "application/json",
                apiKey:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFwbGljYWNpb24gaG9yYXJpb3MgY29sbWVkMyBmaXJtZURpZ2l0YWwiLCJhcHAiOjE1MTYyMzkwMjJ9.dQcQMKVqJMqKlrpTCJ7Vq5KGwN3gBnTHRma85IVIt5U",
              },
              data: {
                idEgreso: egresoId,
                notaAdmin: nota,
              },
            })
            .then((res) => {
              if (res.data.error === false) {
                return this.$swal({
                  icon: "success",
                  title: "Éxito",
                  text: "Por favor realice la busqueda nuevamente para ver los cambios",
                  confirmButtonColor: "black",
                  confirmButtonText: "Cerrar",
                });
              }
              return this.$swal({
                icon: "warning",
                title: "Atención",
                text: res.data.message,
                confirmButtonColor: "black",
                confirmButtonText: "Cerrar",
              });
            });
        });
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