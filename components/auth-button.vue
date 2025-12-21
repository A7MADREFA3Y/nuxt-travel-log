<script lang="ts" setup>
import { createAuthClient } from "better-auth/client"
const authClient =  createAuthClient()
const loading = ref(false)


async function signIn() {
  loading.value = true
  await authClient.signIn.social({
    provider: "github",
    callbackURL: "/dashboard",
  });
  loading.value = false
}
</script>

<template>
  <button :disabled="loading" class="btn btn-accent" @click="signIn">
    sign In with GitHub
    <span v-if="loading" class="loading loading-ring loading-md"></span>
    <Icon v-else name="tabler:brand-github" size="24"/>
  </button>
</template>