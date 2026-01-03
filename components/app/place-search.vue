<script lang="ts" setup>
import { SearchSchema } from '~/lib/zod-schema';
import type { NominatimResult } from "~/lib/types"

const emit = defineEmits<{
    resultSelected: [result: NominatimResult]
}>() 


const searchResults = ref<NominatimResult[]>([]);

async function onSubmit(query: Record<string, string>){
    try{
        const resutlt = await $fetch('/api/search', {
            query,
    
        })
        searchResults.value = resutlt
    }catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <div class="flex flex-col gap-2">
    <Form 
        v-slot="{ errors }"
        class="flex flex-col gap-2 items-center" 
        :validation-schema="toTypedSchema(SearchSchema)" 
        :initial-values="{ q: '' }"
        @submit="onSubmit"
        >
            <div class="join mt-4">
            <div>
                <label class="input">
                    <Icon name="tabler:search"/>
                    <Field 
                    type="text"
                    name="q"
                    placeholder="Search for a Location" 
                    :class="{
                        'input-error': errors.q,
                    }"
                    />
                </label>
                <div v-if="errors.q" class="validator-hint text=error">
                     {{ errors.q }}
                </div>
            </div>
                <button class="btn btn-neutral join-item">
                    Search
                </button>
            </div>
        </Form>
        <div 
            v-for="resutlt in searchResults" 
            :key="resutlt.place_id"
            class="card card-sm bg-base-100"        
            >
            <div class="flex flex-col overflow-auto gap-2 max-h-72 mt-2">
                <div class="card-body">
                    <h4 class="card-title">
                        {{ resutlt.display_name }}
                    </h4>
                     <div class="justify-end card-actions">
                        <button 
                        class="btn btn-primary btn-sm" 
                        @click="emit('resultSelected', resutlt)"
                        >
                            Set Location
                            <Icon name="tabler:map-pin-share" size="20" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>