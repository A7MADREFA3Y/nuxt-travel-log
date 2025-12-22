<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

// TODO: the Pinia is working but the state is always false
const authStore = useAuthStore()

</script>

<template>
  <button @click="authStore.signIn" :disabled="authStore.loading" class="btn btn-accent" >
    sign In with GitHub
    <span v-if="authStore.loading" class="loading loading-ring loading-md"></span>
    <Icon v-else="authStore.loading" name="tabler:brand-github" size="24"/>
    
  </button>
</template>