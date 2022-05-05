<template>
  <q-page class="q-pa-lg">
    <q-card>
      <q-tabs
        v-model="tab"
        align="justify"
        active-color="primary"
        indicator-color="primary"
        class="text-grey-8"
      >
        <q-tab name="info" label="Device info" />
        <q-tab name="properties" label="Properties" />
        <q-tab name="resources" label="Resources" />
        <q-tab name="children" label="Children" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="info">
          <DeviceInfo :device="device" />

          <q-banner v-if="!device.device_parent" class="bg-grey-3 q-mt-md">
            <template v-slot:avatar>
              <q-icon name="info" color="grey" />
            </template>
            This device doesn't have a device parent.
          </q-banner>
          <p class="q-mt-md" v-else>
            <router-link
              :to="{
                name: 'devices.details',
                params: { id: device.device_parent },
              }"
              >Show device parent</router-link
            >
          </p>
        </q-tab-panel>

        <q-tab-panel name="properties">
          <PropertiesList :properties="device.properties" />
        </q-tab-panel>

        <q-tab-panel name="resources">
          <ResourcesList :resources="device.resources" />
        </q-tab-panel>

        <q-tab-panel name="children">
          <DeviceChildren :devices="device.devices" />
        </q-tab-panel>
      </q-tab-panels>

      <q-inner-loading :showing="loading" />
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { Device } from 'src/models/devices'
import { fetchDeviceById } from 'src/services/devices'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import DeviceInfo from './DeviceInfo.vue'
import PropertiesList from '../properties/PropertiesList.vue'
import ResourcesList from '../resources/ResourcesList.vue'
import DeviceChildren from './DeviceChildren.vue'

const route = useRoute()

const tab = ref('info')
const loading = ref(true)
const device = ref<Device>({} as Device)

onMounted(() => {
  const id = parseInt(route.params.id.toString())
  fetchDeviceById(id)
    .then((dev) => (device.value = dev))
    .finally(() => (loading.value = false))
})
</script>
