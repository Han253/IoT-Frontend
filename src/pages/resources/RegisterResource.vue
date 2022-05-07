<template>
  <q-page class="q-pa-lg">
    <div class="row">
      <div class="col-sm-12 col-md-10 col-lg-6 offset-md-1 offset-lg-3">
        <form @submit="onSubmit">
          <q-card>
            <q-card-section>
              <div class="text-h6">Register resource</div>
              <div class="text-subtitle2">
                Please fill out the following form to register a resource,
                fields with * are required.
              </div>
            </q-card-section>

            <q-card-section>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <q-input
                    filled
                    v-model="name"
                    label="Name*"
                    :error="!!errors.name || undefined"
                    :error-message="errors.name || undefined"
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <q-select
                    filled
                    clearable
                    v-model="resourceType"
                    :options="resourceTypes"
                    label="Type*"
                    :error="!!errors.type || undefined"
                    :error-message="errors.type || undefined"
                  />
                </div>
                <div class="col-12">
                  <q-input
                    filled
                    v-model="description"
                    autogrow
                    label="Description"
                    type="textarea"
                    :error="!!errors.description || undefined"
                    :error-message="errors.description || undefined"
                  />
                </div>
              </div>
            </q-card-section>

            <q-card-section>
              <q-btn type="submit" color="primary" unelevated>SAVE DATA</q-btn>
              <q-btn class="q-ml-sm" @click="$router.back()" flat>CANCEL</q-btn>
            </q-card-section>

            <q-inner-loading
              :showing="isSubmitting || loading"
              color="primary"
            />
          </q-card>
        </form>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ResourceForm, ResourceType } from 'src/models/resources'
import { useField, useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  fetchResourceById,
  storeResource,
  updateResource,
} from 'src/services/resources'
import { useQuasar } from 'quasar'
import { setErrorsIfInvalidForm } from 'src/utils/forms'
import { AxiosError } from 'axios'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const resourceId = route.params.id ? parseInt(route.params.id.toString()) : null
let deviceParentId = route.query.device
  ? parseInt(route.query.device.toString())
  : 0

const schema = {
  name: 'required',
  type: 'required',
}

const loading = ref(false)
const resourceTypes = Object.values(ResourceType)

const { isSubmitting, errors, handleSubmit, setErrors } = useForm<ResourceForm>(
  { validationSchema: schema }
)

const { value: name } = useField<string>('name')
const { value: description } = useField<string>('description')
const { value: resourceType } = useField<ResourceType>('type')

const onSubmit = handleSubmit(async (values) => {
  values.deviceParent = deviceParentId
  try {
    if (!resourceId) {
      await storeResource(values)
    } else {
      await updateResource(resourceId, values)
    }
    $q.notify({
      type: 'positive',
      message: 'The resource has been successfully registered.',
    })
    goToRoute()
  } catch (error) {
    setErrorsIfInvalidForm(error as AxiosError, setErrors)
  }
})

const goToRoute = () => {
  let targetRoute = { name: '', params: { id: 0 } }
  if (deviceParentId) {
    targetRoute.name = 'devices.details'
    targetRoute.params.id = deviceParentId
  } else if (resourceId) {
    targetRoute.name = 'resources.details'
    targetRoute.params.id = resourceId
  }
  router.push(targetRoute)
}

const fetchResourceData = async () => {
  if (resourceId) {
    loading.value = true
    const resource = await fetchResourceById(resourceId)
    name.value = resource.name
    description.value = resource.description
    resourceType.value = resource.type
    deviceParentId = resource.device_parent
    loading.value = false
  }
}

onMounted(fetchResourceData)
</script>
