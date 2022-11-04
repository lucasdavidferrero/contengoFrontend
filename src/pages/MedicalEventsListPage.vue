<template>
  <q-page class="q-pa-xl">
    <div>
      <q-markup-table flat bordered>
      <thead>
        <tr>
          <th colspan="5">
            <div class="row no-wrap items-center">
              <h2 class="text-h6 q-ma-none">Listado de Eventos Médicos</h2>
            </div>
          </th>
        </tr>
        <tr>
          <th class="text-left">Ver Detalle</th>
          <th class="text-right">ID Mascota</th>
          <th class="text-right">Veterinario</th>
          <th class="text-right">Observaciones</th>
          <th class="text-right">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left"></td>
          <td class="text-right">5654</td>
          <td class="text-right">Lucas Ferrero</td>
          <td class="text-right">bien ahi</td>
          <td class="text-right">Botones</td>
        </tr>
      </tbody>
    </q-markup-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MedicalEventsListPage'
})
</script>
