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
        <q-tab name="info" label="Environment info" />
        <q-tab name="devices" label="Devices" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="info">
          <EnvInfo :environment="environment" />
        </q-tab-panel>

        <q-tab-panel name="devices">
          <Devices :devices="environment.devices" />
        </q-tab-panel>
      </q-tab-panels>

      <q-inner-loading color="primary" :showing="loading" />
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { Environment } from 'src/models/environments'
import { fetchEnvironmentById } from 'src/services/environments'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import EnvInfo from './EnvironmentInfo.vue'
import Devices from '../devices/DeviceChildren.vue'

const route = useRoute()

const tab = ref('info')
const loading = ref(true)
const environment = ref<Environment>({} as Environment)

onMounted(() => {
  const id = parseInt(route.params.id.toString())
  fetchEnvironmentById(id)
    .then((env) => (environment.value = env))
    .finally(() => (loading.value = false))
})
</script>
