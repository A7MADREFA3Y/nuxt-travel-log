<script lang="ts" setup>
import { CENTRAL_GERMANY } from '~/lib/constants';
import { useMapStore } from '~/stores/map';


const colorMode = useColorMode();
const mapStore = useMapStore();

const style = computed(() =>
 colorMode.value === "dark" 
  ? "/styles/dark.json" 
  : "https://tiles.openfreemap.org/styles/liberty" ) 

const center = CENTRAL_GERMANY;
const zoom = 5;
</script>


<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
  >
    <MglNavigationControl />
    <MglMarker 
      v-for="point in mapStore.mapPoints" 
      :key="point.id" 
      :coordinates="[point.long, point.lat]"
    >
    <template #marker>
      <div class="tooltip tooltip-top" :data-tip="point.label">
          <Icon 
          name="tabler:map-pin-filled" 
          size="30" 
          class="text-secondary"
          />
      </div>
    </template>
    </MglMarker>
</MglMap>
</template>

