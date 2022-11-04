<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="icons/logo-contengo.jpg" />
          </q-avatar>
          Contengo
        </q-toolbar-title>
        <q-tabs v-model="tab">
          <q-route-tab name="inicio" label="Inicio" :to="{ name: 'indexPage' }" exact/>
          <q-route-tab name="eventosMedicos" label="E. Médicos" :to="{ name: 'medicalEventsPage' }" exact/>
          <q-route-tab name="listarEventosMedicos" label="Listar E. Médicos" :to="{ name: 'medicalEventsListPage' }" exact/>
        </q-tabs>
      </q-toolbar>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup () {
    const tab = ref('inicio')
    return {
      tab
    }
  }
})
</script>
