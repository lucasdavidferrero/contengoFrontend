<template>
  <q-page class="q-pa-xl">
    <div>
      <MedicalEventForm />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MedicalEventForm from 'src/components/MedicalEvents/MedicalEventForm.vue'
export default defineComponent({
  name: 'MedicalEventsPage',
  components: { MedicalEventForm }
})
</script>

<style>

</style>
