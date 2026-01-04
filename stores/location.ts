import { defineStore } from "pinia"
import { useSidebarStore } from '~/stores/sidebar'
import { useMapStore } from '~/stores/map'

export const useLocationStore = defineStore("useLocationStore", () => {
  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();  
  const { data, status, refresh } = useFetch<Array<{ 
    id: string;
    slug: string,
    name: string;
    description: string;
    lat: number;
    long: number
  }>>("/api/locations", {
    lazy: true,
  })

  effect(() => {
    if (data.value) {
      sidebarStore.sidebarItems = data.value.map(location => ({
        id: `location-${location.id}`,
        label: location.name,
        icon: "tabler:map-pin-filled",
        href: "#",
        to: { name: 'dashboard-location-slug', params: { slug: location.slug } },
        location,
      }));
      mapStore.mapPoints = data.value;
    } 
    sidebarStore.loading = status.value === "pending";
  })

  return {
    locations: data,
    status,
    refresh,
  }
})
