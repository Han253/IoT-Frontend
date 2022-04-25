<template>
  <q-page class="q-pa-lg">
    <q-table
      :rows-per-page-options="[0]"
      :columns="deviceColumns"
      :rows="devices"
      :loading="loading"
    >
      <template v-slot:top-left>
        <div class="text-h6">Devices</div>
      </template>
      <template v-slot:top-right>
        <q-btn
          :to="{ name: 'devices.form' }"
          color="green-8"
          label="ADD"
          no-caps
        />
      </template>

      <template #body-cell-options="props">
        <q-td :props="props">
          <q-btn
            :to="{ name: 'devices.details', params: { id: props.row.id } }"
            color="grey"
            icon="info"
            flat
            round
          />
          <q-btn
            :to="{ name: 'devices.edit', params: { id: props.row.id } }"
            color="grey"
            icon="edit"
            flat
            round
          />
          <q-btn color="red" icon="delete" flat round />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts" setup>
import { Device, deviceColumns } from 'src/models/devices'
import { fetchDevices } from 'src/services/devices'
import { onMounted, ref } from 'vue'

const devices = ref<Device[]>([])
const loading = ref(false)

const listCategories = () => {
  loading.value = true
  fetchDevices()
    .then((results) => (devices.value = results))
    .finally(() => (loading.value = false))
}

onMounted(listCategories)
</script>
