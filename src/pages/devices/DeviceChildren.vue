<template>
  <q-banner v-if="!devices || !devices.length" class="bg-grey-3">
    <template v-slot:avatar>
      <q-icon name="info" color="grey" />
    </template>
    This device doesn't have devices.
  </q-banner>

  <q-table
    v-else
    hide-bottom
    flat
    bordered
    :rows="devices"
    :columns="deviceColumnsChildren"
  >
    <template #body-cell-options="props">
      <q-td :props="props">
        <q-btn
          :to="{
            name: 'devices.details',
            params: { id: props.row.id },
          }"
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
</template>

<script lang="ts" setup>
import { Device, deviceColumnsChildren } from 'src/models/devices'

defineProps<{ devices: Device[] }>()
</script>
