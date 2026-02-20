<script lang="ts" setup>
import type { InsertLocationLog } from "~/lib/db/schema";
import { useLocationStore } from '~/stores/locations';
import { CENTRAL_GERMANY } from "~/lib/constants";

const route = useRoute();
const { currentLocation } = useLocationStore();

const { $csrfFetch } = useNuxtApp();

async function onSubmit(values: InsertLocationLog) {
  await $csrfFetch(`/api/locations/${route.params.slug}/add`, {
    method: "post",
    body: values,
  });
}

function submitComplete() {
  navigateTo({
    name: "dashboard-location-slug",
    params: {
      slug: route.params.slug,
    },
  });
}
</script>

<template>
  <LocationLogForm
    submit-label="Add Location Log"
    submit-icon="tabler:map-pin-plus"
    :on-submit="onSubmit"
    :on-submit-complete="submitComplete"
    :initial-values="{
      name: '',
      description: '',
      startedAt: Date.now() - (24 * 60 * 60 * 1000),
      endedAt: Date.now(),
      long: currentLocation?.long || (CENTRAL_GERMANY as [number, number])[0],
      lat: currentLocation?.lat || (CENTRAL_GERMANY as [number, number])[1],
    }"
  />
</template>
