<template>
  <q-page class="q-pa-lg">
    <q-table
      :rows-per-page-options="[0]"
      :columns="environmentColumns"
      :rows="environments"
      :loading="loading"
    >
      <template v-slot:top-left>
        <div class="text-h6">Environments</div>
      </template>
      <template v-slot:top-right>
        <q-btn
          color="green-8"
          label="ADD"
          no-caps
          @click="showDialog(undefined)"
        />
      </template>

      <template #body-cell-options="props">
        <q-td :props="props">
          <q-btn
            color="grey"
            icon="info"
            flat
            round
            :to="{ name: 'environments.details', params: { id: props.row.id } }"
          />
          <q-btn
            @click="showDialog(props.row)"
            color="grey"
            icon="edit"
            flat
            round
          />
          <q-btn
            @click="showDeleteEnvironmentDialog(props.row)"
            color="red"
            icon="delete"
            flat
            round
          />
        </q-td>
      </template>
    </q-table>

    <EnvForm @saved="listEnvironments" ref="envForm" />
    <EnvDelete @deleted="listEnvironments" ref="envDelete" />
  </q-page>
</template>

<script lang="ts" setup>
import { Environment, environmentColumns } from 'src/models/environments'
import { fetchEnvironments } from 'src/services/environments'
import { onMounted, ref } from 'vue'
import EnvForm from './EnvironmentFormDialog.vue'
import EnvDelete from './DeleteEnvironmentDialog.vue'

const envForm = ref<InstanceType<typeof EnvForm> | null>(null)
const envDelete = ref<InstanceType<typeof EnvDelete> | null>(null)

const environments = ref<Environment[]>([])
const loading = ref(false)

const showDialog = (e: Environment | undefined = undefined) => {
  envForm.value?.showForm(e)
}

const showDeleteEnvironmentDialog = (e: Environment) => {
  envDelete.value?.showDialog(e)
}

const listEnvironments = () => {
  loading.value = true
  fetchEnvironments()
    .then((results) => (environments.value = results))
    .finally(() => (loading.value = false))
}

onMounted(listEnvironments)
</script>
