<template>
  <q-page class="q-pa-lg">
    <div class="row">
      <div class="col-sm-12 col-lg-8 col-xl-6 offset-lg-2 offset-xl-3">
        <form @submit="onSubmit">
          <q-card>
            <q-card-section>
              <div class="text-h6">
                {{ deviceId ? 'Update device' : 'Register device' }}
              </div>
              <div class="text-subtitle2">
                Please fill out the following form to register a device, fields
                with * are required.
              </div>

              <small>
                <i>
                  ** You can add resources and properties on the device details
                  page.
                </i>
              </small>
            </q-card-section>

            <q-card-section>
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-12">
                  <q-input
                    filled
                    v-model="name"
                    label="Name*"
                    :error="!!errors.name || undefined"
                    :error-message="errors.name || undefined"
                  />
                </div>
              </div>

              <div class="row q-mb-md">
                <div class="col-12">
                  <q-input
                    filled
                    autogrow
                    v-model="description"
                    label="Description"
                    type="textarea"
                    :error="!!errors.description || undefined"
                    :error-message="errors.description || undefined"
                  />
                </div>
              </div>

              <div class="row q-mb-md q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-select
                    filled
                    clearable
                    v-model="categoriesSelected"
                    multiple
                    :options="categoriesOptions"
                    label="Categories"
                    :error="!!errors.categories || undefined"
                    :error-message="errors.categories || undefined"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-select
                    filled
                    clearable
                    v-model="deviceParent"
                    :options="deviceOptions"
                    label="Device parent"
                    :error="!!errors.device_parent || undefined"
                    :error-message="errors.device_parent || undefined"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-12 col-md-6">
                  <q-select
                    filled
                    clearable
                    v-model="environmentSelected"
                    :options="envOptions"
                    label="Environment"
                    :error="!!errors.environment || undefined"
                    :error-message="errors.environment || undefined"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-checkbox v-model="isGateway" label="Is gateway?" />
                </div>
              </div>
            </q-card-section>

            <q-card-section>
              <q-btn type="submit" color="primary" unelevated>SAVE DATA</q-btn>
              <q-btn class="q-ml-sm" :to="{ name: 'devices.index' }" flat>
                CANCEL
              </q-btn>
            </q-card-section>

            <q-inner-loading :showing="busy || isSubmitting" />
          </q-card>
        </form>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { AxiosError } from 'axios'
import { useQuasar } from 'quasar'
import { SelectOption } from 'src/models'
import { Category } from 'src/models/categories'
import { Device, DeviceForm } from 'src/models/devices'
import { fetchCategories } from 'src/services/categories'
import { fetchEnvironments } from 'src/services/environments'
import {
  fetchDevices,
  storeDevice,
  fetchDeviceById,
  updateDevice,
} from 'src/services/devices'
import { setErrorsIfInvalidForm } from 'src/utils/forms'
import { useField, useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Environment } from 'src/models/environments'

const $q = useQuasar()
const router = useRouter()
const route = useRoute()

const schema = {
  name: 'required',
}
const deviceId = route.params.id

const categoriesOptions = ref<SelectOption[]>([])
const deviceOptions = ref<SelectOption[]>([])
const envOptions = ref<SelectOption[]>([])
const busy = ref(true)

const { errors, isSubmitting, handleSubmit, setErrors } = useForm<DeviceForm>({
  validationSchema: schema,
})

// Form data
const { value: name } = useField<string>('name')
const { value: description } = useField<string>('description')
const { value: deviceParent } = useField<SelectOption | null>('device_parent')
const { value: categoriesSelected } = useField<SelectOption[] | null>(
  'categories'
)
const { value: environmentSelected } = useField<SelectOption | null>(
  'environment'
)
const isGateway = ref(false)

const onSubmit = handleSubmit(async (values) => {
  const categories = categoriesSelected.value
    ? categoriesSelected.value.map((c) => c.value as number)
    : []

  const device = deviceParent.value
    ? (deviceParent.value.value as number)
    : null

  const environment = environmentSelected.value
    ? (environmentSelected.value.value as number)
    : null

  values.categories = categories
  values.device_parent = device
  values.environment = environment
  values.gateway = isGateway.value

  try {
    let savedDevice: Device
    if (deviceId) {
      const id = parseInt(deviceId.toString())
      savedDevice = await updateDevice(id, values)
    } else {
      savedDevice = await storeDevice(values)
    }
    $q.notify({
      type: 'positive',
      message: 'The device data has been successfully registered',
    })
    router.push({ name: 'devices.details', params: { id: savedDevice.id } })
  } catch (error) {
    setErrorsIfInvalidForm(error as AxiosError, setErrors)
  }
})

const convertCategoriesToOptions = (c: Category[]): SelectOption[] => {
  return c.map((category) => ({
    label: category.name,
    value: category.id,
  }))
}

const convertDevicesToOptions = (d: Device[]): SelectOption[] => {
  return d.map((device) => ({
    label: device.name,
    value: device.id,
  }))
}

const convertEnvironmentsToOptions = (e: Environment[]): SelectOption[] => {
  return e.map((environment) => ({
    label: environment.name,
    value: environment.id,
  }))
}

onMounted(async () => {
  if (deviceId) {
    const deviceData = await fetchDeviceById(parseInt(deviceId.toString()))
    name.value = deviceData.name
    description.value = deviceData.description
    // TODO: Fetch device parent info for set option correctly.
    deviceParent.value = deviceData.device_parent
      ? { label: '', value: deviceData.device_parent }
      : null

    environmentSelected.value = deviceData.environment
      ? { label: '', value: deviceData.environment }
      : null

    categoriesSelected.value = deviceData.categories.map<SelectOption>((c) => ({
      label: c.name,
      value: c.id,
    }))
  }

  const categories = await fetchCategories()
  categoriesOptions.value = convertCategoriesToOptions(categories)

  const devices = await fetchDevices()
  deviceOptions.value = convertDevicesToOptions(devices)

  const environments = await fetchEnvironments()
  envOptions.value = convertEnvironmentsToOptions(environments)

  // TODO: Fetch device parent info for remove the below code.
  if (deviceParent.value?.value) {
    deviceOptions.value.forEach((d) => {
      if (d.value == deviceParent.value?.value) {
        deviceParent.value.label = d.label
      }
    })
  }
  ///////////////////////////////////////////////////////////
  if (environmentSelected.value?.value) {
    envOptions.value.forEach((e) => {
      if (e.value == environmentSelected.value?.value) {
        environmentSelected.value.label = e.label
      }
    })
  }

  busy.value = false
})
</script>
