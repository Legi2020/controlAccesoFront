<template>
  <div class="container">
    <div class="row tabla">
      <div class="col p-0">
        <h1 class="p-3">Informe</h1>
        <table class="table">
          <thead class="text-center thead-dark">
            <tr>
              <th scope="col" class="align-middle">Empleado</th>
              <th scope="col" class="align-middle">Premio</th>
              <th scope="col" class="align-middle">Informe</th>
            </tr>
          </thead>
          <tbody v-if="empleados">
            <tr v-for="empleado in empleados" :key="empleado.id">
              <td class="align-middle text-center">
                {{ empleado.apellido }} {{ empleado.nombre }}
              </td>
              <td class="align-middle text-center">OK</td>
              <td class="align-middle text-center">
               Detalles
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
          }
        });
    },
  },
};
</script>

<style>
.tabla {
  background: white;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 6px 10px 31px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 6px 10px 31px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 10px 31px 0px rgba(0, 0, 0, 0.75);
}
</style>
