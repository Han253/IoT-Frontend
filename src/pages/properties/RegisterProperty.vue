<template>
  <q-page class="q-pa-lg">
    <div class="row">
      <div class="col-sm-12 col-md-10 col-lg-6 offset-md-1 offset-lg-3">
        <form @submit="onSubmit">
          <q-card>
            <q-card-section>
              <div class="text-h6">Register property</div>
              <div class="text-subtitle2">
                Please fill out the following form to register a property,
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
                  <q-input
                    filled
                    v-model="value"
                    autogrow
                    label="Value*"
                    :error="!!errors.value || undefined"
                    :error-message="errors.value || undefined"
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
import { useField, useForm } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import { PropertyForm } from 'src/models/properties'
import {
  storeProperty,
  updateProperty,
  fetchPropertyById,
} from 'src/services/properties'
import { setErrorsIfInvalidForm } from 'src/utils/forms'
import { AxiosError } from 'axios'
import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const propertyId = route.params.id ? parseInt(route.params.id.toString()) : null
const deviceParentId = route.query.device
  ? parseInt(route.query.device.toString())
  : null
const resourceParentId = route.query.resource
  ? parseInt(route.query.resource.toString())
  : null

const loading = ref(false)

const { errors, isSubmitting, setErrors, handleSubmit } =
  useForm<PropertyForm>()
const { value: name } = useField<string>('name')
const { value: description } = useField<string | null>('description')
const { value: value } = useField<string>('value')

const onSubmit = handleSubmit(async (values) => {
  if (!propertyId) {
    values.device_parent = deviceParentId
    values.resource_parent = resourceParentId
  }

  try {
    if (!propertyId) {
      await storeProperty(values)
    } else {
      await updateProperty(propertyId, values)
    }
    $q.notify({
      type: 'positive',
      message: 'The property has been successfully registered.',
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
  } else if (resourceParentId) {
    targetRoute.name = 'resources.details'
    targetRoute.params.id = resourceParentId
  }
  router.push(targetRoute)
}

const fetchPropertyData = async () => {
  if (propertyId) {
    loading.value = true
    const data = await fetchPropertyById(propertyId)
    name.value = data.name
    description.value = data.description
    value.value = data.value
    loading.value = false
  }
}

onMounted(fetchPropertyData)
</script>
