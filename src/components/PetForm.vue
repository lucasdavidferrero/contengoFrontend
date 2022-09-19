<template>
  <div>
    <div>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-6">
          <q-input
            v-model="form.name"
            label="Nombre"
            :rules="[fRules.required]" lazy-rules
            />
        </div>
        <div class="col-xs-12 col-md-6">
          <q-select v-model="form.specie"
            :options="specieOptions"
            label="Especie"
            :rules="[fRules.required]" lazy-rules/>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-6">
          <q-input
            v-model="form.breed"
            label="Raza"
            :rules="[fRules.required]" lazy-rules
            />
        </div>
        <div class="col-xs-12 col-md-6">
          <q-input
            v-model.number="form.weightKg"
            label="Peso"
            hint="Peso en Kilogramos."
            :rules="[fRules.requiredNum, fRules.positiveNumber]" lazy-rules
            />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-6">
          <q-select v-model="form.sex"
            :options="sexOptions"
            label="Sexo"
            :rules="[fRules.required]" lazy-rules/>
        </div>
        <div class="col-xs-12 col-md-6">
          <q-input
            v-model="form.birthDate"
            mask="date"
            label="Fecha nacimiento"
            :rules="[fRules.required, 'date']" lazy-rules/>
        </div>
      </div>

    </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Pet } from 'src/entities/Pet'
import { defineComponent, PropType, reactive } from 'vue'
import { required, positiveNumber, requiredNum } from 'src/utils/Rules'

export default defineComponent({
  name: 'PetForm',
  props: {
    pet: {
      type: Object as PropType<Pet>,
      default: null
    }
  },
  setup (props) {
    const form = reactive({
      name: '',
      specie: '',
      breed: '',
      weightKg: 0,
      sex: '',
      birthDate: null
    })

    const fRules = {
      required,
      positiveNumber,
      requiredNum
    }

    const specieOptions = [{ label: 'Perro', value: 'perro' }, { label: 'Gato', value: 'gato' }, { label: 'Otro', value: 'otro' }]
    const sexOptions = [{ label: 'Masculino', value: 'masculino' }, { label: 'Femenino', value: 'femenino' }, { label: 'otro', value: 'otro' }]

    function onSubmit () {
      console.log(props.pet)
    }

    function onReset () {
      console.log(props.pet)
    }

    return {
      form,
      fRules,
      specieOptions,
      sexOptions,
      onSubmit,
      onReset
    }
  }
})
</script>
