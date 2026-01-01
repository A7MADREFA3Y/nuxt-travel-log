<script lang="ts" setup>
  
import { useLocationStore } from '~/stores/location';
import { useMapStore } from '~/stores/map';
import { useSidebarStore } from '~/stores/sidebar';

const isSidebarOpen = ref(true); 
const route = useRoute();
const sidebarStore = useSidebarStore();
const locationStore = useLocationStore();
const mapStore = useMapStore();

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
  if(route.path !== "/dashboard"){
    locationStore.refresh();
  }
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
}

</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-200 transition-all duration-400 shrink-0" :class="{'w-64': isSidebarOpen, 'w-16':!isSidebarOpen}">
      <div class="flex hover:cursor-pointer hover:bg-base-300 p-2" :class="{'justify-center':!isSidebarOpen,  'justify-end': isSidebarOpen }" @click="toggleSidebar">
        <Icon v-if="isSidebarOpen" name="tabler:chevron-left" size="32"/>
        <Icon v-else name="tabler:chevron-right" size="32"/>
      </div>
      <div class="flex flex-col gap-2">
        <SidebarButton
        :showLabel="isSidebarOpen" 
        label="Locations" 
        icon="tabler:map" 
        href="/dashboard"
        />
        <SidebarButton 
        :showLabel="isSidebarOpen" 
        label="Add Location" 
        icon="tabler:circle-plus-filled" 
        href="/dashboard/add"
        />          
        <div v-if=" sidebarStore.loading || sidebarStore.sidebarItems.length" class="divider" />
        <div v-if="sidebarStore.loading" class="px-4">
          <div class="skeleton h-4 w-full" />
        </div>
          <div v-if="!sidebarStore.loading && sidebarStore.sidebarItems.length" class="flex flex-col">
            <SidebarButton
          v-for="item in sidebarStore.sidebarItems"
          :showLabel="isSidebarOpen" 
          :key="item.id"
          :label="item.label"
          :icon="item.icon"
          :href="item.href"
          :icon-color="mapStore.selectedPoint === item.location ? 'text-accent' : undefined"
          @mouseenter="mapStore.selectedPoint = item.location"
          @mouseleave="mapStore.selectedPoint = null"
          />
        </div>
        <div class="divider">OR</div>
        <SidebarButton 
        :showLabel="isSidebarOpen" 
        label="Sign Out" 
        icon="tabler:logout-2" 
        href="/sign-out"
        /> 
      </div>
    </div>
    <div class="flex-1 overflow-auto bg-base-300">
      <div class="flex size-full" :class="{'flex-col': route.path !== '/dashboard/add' }">
        <NuxtPage />
        <AppMap class="flex-1" />
      </div>
    </div>
  </div>
</template>