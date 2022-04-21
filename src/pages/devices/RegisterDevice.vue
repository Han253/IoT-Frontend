<template>
  <q-page class="q-pa-lg">
    <div class="row">
      <div class="col-sm-12 col-lg-8 col-xl-6 offset-lg-2 offset-xl-3">
        <form @submit="onSubmit">
          <q-card>
            <q-card-section>
              <div class="text-h6">Register device</div>
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

              <div class="row q-col-gutter-md">
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
            </q-card-section>

            <q-card-actions>
              <q-btn type="submit" color="primary" flat>SAVE DATA</q-btn>
              <q-btn :to="{ name: 'devices.index' }" flat>CANCEL</q-btn>
            </q-card-actions>

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
import { fetchDevices, storeDevice } from 'src/services/devices'
import { setErrorsIfInvalidForm } from 'src/utils/forms'
import { useField, useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()
const schema = {
  name: 'required',
}

const categoriesOptions = ref<SelectOption[]>([])
const deviceOptions = ref<SelectOption[]>([])
const busy = ref(true)

const { errors, isSubmitting, handleSubmit, setErrors } = useForm<DeviceForm>({
  validationSchema: schema,
})

// Form data
const { value: name } = useField<string>('name')
const { value: description } = useField<string>('description')
const { value: deviceParent } = useField<SelectOption>('device_parent')
const { value: categoriesSelected } = useField<SelectOption[]>('categories')

const onSubmit = handleSubmit(async (values) => {
  const categories = categoriesSelected.value
    ? categoriesSelected.value.map((c) => c.value as number)
    : []

  const device = deviceParent.value
    ? (deviceParent.value.value as number)
    : null

  values.categories = categories
  values.device_parent = device

  try {
    const savedDevice = await storeDevice(values)
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

const convertDevicesToOptions = (c: Device[]): SelectOption[] => {
  return c.map((device) => ({
    label: device.name,
    value: device.id,
  }))
}

onMounted(async () => {
  const categories = await fetchCategories()
  categoriesOptions.value = convertCategoriesToOptions(categories)

  const devices = await fetchDevices()
  deviceOptions.value = convertDevicesToOptions(devices)

  busy.value = false
})
</script>
