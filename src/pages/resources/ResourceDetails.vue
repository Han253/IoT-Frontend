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
        <q-tab name="info" label="Resource info" />
        <q-tab name="properties" label="Properties" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="info">
          <ResourceInfo :resource="resource" />
        </q-tab-panel>

        <q-tab-panel name="properties">
          <PropertiesList :properties="resource.properties" />
        </q-tab-panel>
      </q-tab-panels>

      <q-inner-loading color="primary" :showing="loading" />
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { Resource } from 'src/models/resources'
import { fetchResourceById } from 'src/services/resources'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ResourceInfo from './ResourceInfo.vue'
import PropertiesList from '../properties/PropertiesList.vue'

const route = useRoute()
const tab = ref('info')
const loading = ref(true)

const resource = ref<Resource>({} as Resource)

onMounted(async () => {
  const id = parseInt(route.params.id.toString())
  const data = await fetchResourceById(id)
  resource.value = data
  loading.value = false
})
</script>
