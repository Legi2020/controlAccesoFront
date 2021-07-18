<template>
  <div class="container">
    <div class="row tabla">
      <div class="col p-0">
        <h1 class="p-3">REGISTRO INGRESOS Y EGRESOS</h1>
        <table class="table" v-if="empleados.length > 0">
          <thead class="text-center thead-dark">
            <tr>
              <th scope="col" class="align-middle">Empleado</th>
              <th scope="col" class="align-middle">Ingreso</th>
              <th scope="col" class="align-middle">Egreso</th>
              <th scope="col" class="align-middle">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="empleado in empleados" :key="empleado.id">
              <td class="align-middle text-center">
                {{ empleado.apellido }} {{ empleado.nombre }}
              </td>
              <td class="align-middle text-center">
                <ul>
                  <li v-for="ingreso in empleado.ingresos" :key="ingreso.id">
                    {{ normalizarHora(ingreso.hora) }}
                  </li>
                </ul>
              </td>
              <td class="align-middle text-center">
                <ul>
                  <li v-for="egreso in empleado.egresos" :key="egreso.id">
                    {{ normalizarHora(egreso.hora) }}
                  </li>
                </ul>
              </td>
              <td class="align-middle text-center">
                <button
                  type="button"
                  @click="registrarIngreso(empleado)"
                  class="btn btn-primary"
                  style="margin: 13px"
                >
                  Ingresos
                </button>
                <button
                  type="button"
                  @click="registrarEgreso(empleado)"
                  class="btn btn-primary"
                  :id="empleado.id"
                >
                  Egreso
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
  name: "RegistroIE",
  props: {
    msg: String,
  },
  data() {
    return {
      empleados: [],
    };
  },
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
            this.getIngresos();
            this.getEgresos();
          }
        });
    },
    getIngresos() {
      axios
        .get(process.env.VUE_APP_API_ROUTE + "ingreso/hoy", {
          headers: {
            "Content-Type": "application/json",
            apiKey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFwbGljYWNpb24gaG9yYXJpb3MgY29sbWVkMyBmaXJtZURpZ2l0YWwiLCJhcHAiOjE1MTYyMzkwMjJ9.dQcQMKVqJMqKlrpTCJ7Vq5KGwN3gBnTHRma85IVIt5U",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.ingresos = res.data.ingresos;
            this.empleados.forEach((empleado) => {
              let ingresos = this.ingresos.filter(
                (ingreso) => ingreso.empleadoId == empleado.id
              );
              empleado.ingresos = ingresos;
            });
          }
        });
    },
    getEgresos() {
      axios
        .get(process.env.VUE_APP_API_ROUTE + "egreso/hoy", {
          headers: {
            "Content-Type": "application/json",
            apiKey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFwbGljYWNpb24gaG9yYXJpb3MgY29sbWVkMyBmaXJtZURpZ2l0YWwiLCJhcHAiOjE1MTYyMzkwMjJ9.dQcQMKVqJMqKlrpTCJ7Vq5KGwN3gBnTHRma85IVIt5U",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.egresos = res.data.egresos;
            this.empleados.forEach((empleado) => {
              let egresos = this.egresos.filter(
                (ingreso) => ingreso.empleadoId == empleado.id
              );
              empleado.egresos = egresos;
            });
          }
        });
    },
    normalizarHora(hora) {
      return hora.toString().substring(11, 16);
    },
    registrarIngreso(empleado) {
      this.$swal
        .fire({
          input: "textarea",
          title: empleado.nombre,
          inputLabel: "Ingrese una nota",
          confirmButtonText: `Registrar Ingreso`,
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
            .post(process.env.VUE_APP_API_ROUTE + "ingreso", {
              headers: {
                "Content-Type": "application/json",
                apiKey:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFwbGljYWNpb24gaG9yYXJpb3MgY29sbWVkMyBmaXJtZURpZ2l0YWwiLCJhcHAiOjE1MTYyMzkwMjJ9.dQcQMKVqJMqKlrpTCJ7Vq5KGwN3gBnTHRma85IVIt5U",
              },
              data: {
                idEmpleado: empleado.id,
                nota,
              },
            })
            .then((res) => {
              if (res.data.error === false) {
                this.getEmpleados();
                return this.$swal({
                  icon: "success",
                  title: "Éxito",
                  text: res.data.message,
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
    registrarEgreso(empleado) {
      this.$swal
        .fire({
          input: "textarea",
          title: empleado.nombre,
          inputLabel: "Ingrese una nota",
          confirmButtonText: `Registrar Egreso`,
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
            .post(process.env.VUE_APP_API_ROUTE + "egreso", {
              headers: {
                "Content-Type": "application/json",
                apiKey:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFwbGljYWNpb24gaG9yYXJpb3MgY29sbWVkMyBmaXJtZURpZ2l0YWwiLCJhcHAiOjE1MTYyMzkwMjJ9.dQcQMKVqJMqKlrpTCJ7Vq5KGwN3gBnTHRma85IVIt5U",
              },
              data: {
                idEmpleado: empleado.id,
                nota,
              },
            })
            .then((res) => {
              if (res.data.error === false) {
                this.getEmpleados();
                return this.$swal({
                  icon: "success",
                  title: "Éxito",
                  text: res.data.message,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
ul {
  padding: 0px;
}
li {
  list-style: none;
}
.tabla {
  background: white;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 6px 10px 31px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 6px 10px 31px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 10px 31px 0px rgba(0, 0, 0, 0.75);
}
textarea {
  min-height: 100px;
  max-height: 100px;
}
</style>
