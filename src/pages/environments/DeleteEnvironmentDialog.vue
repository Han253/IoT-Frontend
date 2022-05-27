<template>
  <q-dialog v-model="show" :persistent="erasing">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="negative" text-color="white" />
        <span class="q-ml-sm">
          Are you sure you want to delete the environment?
          <ul v-if="environment">
            <li>{{ environment.name }}</li>
          </ul>
        </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          flat
          label="Delete"
          color="negative"
          @click="removeEnvironment"
        />
      </q-card-actions>

      <q-inner-loading :showing="erasing" color="primary" />
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { Environment } from 'src/models/environments'
import { deleteEnvironment } from 'src/services/environments'
import { ref } from 'vue'

const emit = defineEmits(['deleted'])
const show = ref(false)
const erasing = ref(false)
const environment = ref<Environment | null>(null)
const $q = useQuasar()

const showDialog = (c: Environment) => {
  environment.value = c
  show.value = true
}

const removeEnvironment = () => {
  if (environment.value) {
    erasing.value = true
    deleteEnvironment(environment.value.id)
      .then(() => {
        show.value = false
        $q.notify({
          message: `The environment "${environment.value?.name}" has been removed.`,
          type: 'negative',
        })
        emit('deleted')
      })
      .finally(() => (erasing.value = false))
  }
}

defineExpose({
  showDialog,
})
</script>
