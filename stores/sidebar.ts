import {defineStore} from "pinia";
import type { RouteLocation, RouteLocationRaw } from "vue-router";
import type { MapPoint } from "~/lib/types";

export type SidebarItem = {
  id: string;
  label: string;
  icon: string;
  href?: string;
  to?:RouteLocationRaw;
  location?: MapPoint | null;
};

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const sidebarItems = ref<SidebarItem[]>([]);
  const loading = ref(false);

  return {
    loading,
    sidebarItems,
  };
});