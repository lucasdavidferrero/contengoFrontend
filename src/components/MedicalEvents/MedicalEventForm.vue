<template>
  <div class="q-card q-pa-md">
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
          <q-input v-model="form.headerDate" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.headerDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="OK" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-6">
          <q-input v-model="form.headerTime" mask="time" :rules="['time']">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="form.headerTime" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="OK" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-md-6">
          <q-input
            v-model="form.vetName"
            label="Veterinario"/>
        </div>
      </div>

      <section class="q-ml-none">
        <h2 class="text-h6 q-ma-none">Detalle</h2>
        <div class="row q-mt-sm">
          <q-btn round type="submit" color="primary" icon="add"/>
        </div>
      </section>

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
