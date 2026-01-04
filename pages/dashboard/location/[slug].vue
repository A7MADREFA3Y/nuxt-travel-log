<script lang="ts" setup>
import { useMapStore } from '~/stores/map';

const mapStore = useMapStore();

  const route = useRoute();
  const { slug } = route.params;
  const { data: location, status, error } = await useFetch(`/api/locations/${slug}`, {
    lazy: true,
  });

  effect(() => {
    if (location.value) {
      mapStore.mapPoints = [location.value];
    }
  })

  

</script>

<template>
  <div class="p-4 min-h-64">
    <div v-if="status === 'pending'">
      <div class="loading loading-spinner loading-sm" />
    </div>
    <div v-if="location && status !== 'pending'">
      <h3 class="text-xl">
        {{ location.name }}
      </h3>
      <p class="text-sm">
        {{ location.description }}
      </p>
      <div v-if="!location.locationLogs.length" class="mt-4">
        <p class="text-sm italic">
          Add a location log to get started
        </p>
        <button class="btn btn-primary mt-2">
          Add location Log
          <Icon name="tabler:map-pin-plus" size="24" />    
        </button>
      </div>
    </div>
    <div 
      v-if="error && status !== 'pending'"
      class="alert alert-error"
    >
      <h2 class="text-lg">
        {{ error.statusMessage }}
      </h2>
    </div>
  </div>
</template>
