<script lang="ts" setup>
import { CENTRAL_GERMANY } from '~/lib/constants';


const colorMode = useColorMode();

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
  </MglMap>
</template>

