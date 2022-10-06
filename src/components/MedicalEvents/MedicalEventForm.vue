<template>
  <div>
    <div class="q-pa-lg relative-position">
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
        ref="qFormRef"
      >
      <div class="text-h6 q-ma-none">Formulario Evento Médico</div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-6">
          <q-input
            v-model="form.idMascota"
            label="ID Mascota *"
            :rules="[fRules.required]" lazy-rules
            />
        </div>
        <div class="col-xs-12 col-md-6">
          <q-input
            v-model="form.headerDate"
            mask="date"
            label="Fecha"
            :rules="[fRules.required, 'date']" lazy-rules/>
            <!--mask="hh:mm A"-->
        </div>
        <div class="col-xs-12 col-md-6">
          <q-input
            v-model="form.headerTime"
            mask="hh:mm"
            label="Hora *"
            :rules="[fRules.required, 'time']" lazy-rules/>
        </div>
      </div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-12">
          <q-input
            v-model="form.vetName"
            label="Veterinario"/>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-12">
          <q-input
            v-model="form.observations"
            label="Observaciones" autogrow
          />
        </div>
      </div>

      <div class="row justify-center">
        <q-btn label="Cancelar" type="button" color="primary" flat class="q-mr-sm"/>
        <q-btn label="Guardar" type="submit" color="primary"/>
      </div>

      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { required, positiveNumber, requiredNum } from 'src/utils/Rules'
export default defineComponent({
  name: 'MedicalEventForm',
  setup () {
    const form = reactive({
      idMascota: '',
      headerDate: '',
      headerTime: '',
      vetName: '',
      observations: ''
    })

    const onSubmit = () => console.log('Submit the form')

    const fRules = {
      required,
      positiveNumber,
      requiredNum
    }

    return {
      onSubmit,
      form,
      fRules
    }
  }
})
</script>

<style lang="scss"></style>
