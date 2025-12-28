import { defineStore } from "pinia"
import { useSidebarStore } from '~/stores/sidebar'
import { useMapStore } from '~/stores/map'

export const useLocationStore = defineStore("useLocationStore", () => {
  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();  
  const { data, status, refresh } = useFetch<Array<{ 
    id: string;
    name: string;
    description: string;
    lat: string;
    long: string
  }>>("/api/locations", {
    lazy: true,
  })

  watchEffect(() => {
    if (data.value) {
      sidebarStore.sidebarItems = data.value.map(location => ({
        id: `location-${location.id}`,
        label: location.name,
        icon: "tabler:map-pin-filled",
        href: "#",
      }));
      mapStore.mapPoints = data.value.map(location => ({
        id: location.id,
        label: location.name,
        lat: location.lat,
        long: location.long,
      }))
    } 
    sidebarStore.loading = status.value === "pending"    
  })

  return {
    locations: data,
    status,
    refresh,
  }
})
