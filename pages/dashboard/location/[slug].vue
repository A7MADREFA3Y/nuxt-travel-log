<script lang="ts" setup>
  const route = useRoute();
  const { slug } = route.params;
  const { data: location } = await useFetch(`/api/locations/${slug}`)
</script>

<template>
  <div class="p-4 min-h-64">
    <h3>
      {{ location?.name }}
    </h3>
  </div>
</template>
