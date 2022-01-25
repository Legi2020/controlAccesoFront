<template>
  <div class="container">
    <div class="row tabla">
      <div class="col p-0">
        <h1 class="p-3">Administración</h1>
      </div>
      <div class="col-12">
        <h3 class="p-3">Registrar ingreso</h3>
        <form @submit.prevent="addIngreso()">
          <div class="row p-2">
            <div class="col-6">
              <div class="form-group">
                <label for="empleado">Empleado</label>
                <select
                  class="form-control"
                  v-model="selected"
                >
                  <option
                    v-for="empleado in empleados"
                    :key="empleado.id"
                    v-bind:value="empleado.id"
                  >
                    {{ empleado.apellido }} {{ empleado.nombre }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="nota-admin">Nota Admin</label>
                <textarea
                  class="form-control"
                  id="nota-admin"
                  rows="5"
                  v-model="notaAdmin"
                ></textarea>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="fecha-desde">Fecha</label>
                <input
                  type="date"
                  class="form-control"
                  name="fechaDesde"
                  id="fecha-desde"
                  v-model="fechaDesde"
                />
              </div>
            </div>
            <div class="col-12 mb-4">
              <input
                type="submit"
                class="btn btn-primary btn-lg rounded-lg"
                value="Registrar ingreso"
              />
            </div>
          </div>
        </form>
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
      empleados: [],
      selected: 1,
      fechaDesde: null,
      notaAfechaDesdedmin: null,
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
  created() {},
  mounted() {
    this.getEmpleados();
  },
  methods: {
    getEmpleados() {
      axios
        .get(process.env.VUE_APP_API_ROUTE + "empleado", {
          headers: {
            "Content-Type": "application/json",
            apiKey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFwbGljYWNpb24gaG9yYXJpb3MgY29sbWVkMyBmaXJtZURpZ2l0YWwiLCJhcHAiOjE1MTYyMzkwMjJ9.dQcQMKVqJMqKlrpTCJ7Vq5KGwN3gBnTHRma85IVIt5U",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.empleados = res.data.empleados;
          }
        });
    },
    addIngreso() {
      if (!this.selected || !this.fechaDesde || !this.notaAdmin) {
        return this.$swal({
          icon: "warning",
          title: "Atención",
          text: "Todos los campos son obligatorios",
          confirmButtonColor: "black",
          confirmButtonText: "Cerrar",
        });
      }
      axios
        .post(process.env.VUE_APP_API_ROUTE + "ingreso-admin", {
          headers: {
            "Content-Type": "application/json",
            apiKey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFwbGljYWNpb24gaG9yYXJpb3MgY29sbWVkMyBmaXJtZURpZ2l0YWwiLCJhcHAiOjE1MTYyMzkwMjJ9.dQcQMKVqJMqKlrpTCJ7Vq5KGwN3gBnTHRma85IVIt5U",
          },
          data: {
            empleadoId: this.selected,
            fecha: this.fechaDesde,
            notaAdmin: this.notaAdmin,
          },
        })
        .then((res) => {
          return this.$swal({
            icon: "success",
            title: "Éxito",
            text: res.data.message,
            confirmButtonColor: "black",
            confirmButtonText: "Cerrar",
          });
        })
        .catch((error) => {
          return this.$swal({
            icon: "error",
            title: "No se pudo registrar el ingreso",
            text: error.response.data.message,
            confirmButtonColor: "black",
            confirmButtonText: "Cerrar",
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