import { defineStore } from "pinia";
import { useSidebarStore } from '~/stores/sidebar';

const { data, status, refresh } = useFetch<Array<{ 
    id: string;
    name: string;
    description: string
 }>>("/api/locations", {
    lazy: true,
});

export const useLocationStore = defineStore("useLocationStore", () => {

const sidebarStore = useSidebarStore();

watchEffect(() => {
    if(data.value){
        sidebarStore.sidebarItems = data.value.map(location => ({
            id:`location-${location.id}`,
            label: location.name,
            icon: "tabler:map-pin-filled",
            href: "#",
        }));
    } 
    sidebarStore.loading = status.value === "pending";    
});
    return{
        locations: data,
        status,
        refresh,
    }
})

