<template>
  <q-page class="q-pa-xl">
    <PetABM />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PetABM from 'src/components/Pets/PetABM.vue'
export default defineComponent({
  name: 'IndexPage',
  components: { PetABM }
})
</script>
