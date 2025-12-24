<script lang="ts" setup>
import AuthButton from "~/components/auth-button.vue";
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
</script>

<template>
  <div class="hero bg-base-300 container mx-auto mt-4 rounded-box">
    <div class="hero-content text-center min-h-90">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Travel Log</h1>
        <p class="py-6">
          Keep track of your travels and adventures with this simple Travel Log.
        </p>
        <AuthButton v-if="!authStore.user"/>
        <NuxtLink v-else to="/dashboard" class="btn btn-primary">
          start Logging 
        </NuxtLink>
      </div>
    </div>
  </div>
</template>