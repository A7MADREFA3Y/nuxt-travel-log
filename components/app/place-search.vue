<script lang="ts" setup>
import type { FetchError } from "ofetch"
import { SearchSchema } from '~/lib/zod-schema';
import type { NominatimResult } from "~/lib/types"
import { useTemplateRef } from 'vue';

const emit = defineEmits<{
    resultSelected: [result: NominatimResult]
}>() 


const searchResults = ref<NominatimResult[]>([]);
const form = useTemplateRef("form");
const loading = ref(false);
const errorMessage = ref("");

async function onSubmit(query: Record<string, string>){
    try{
        loading.value = true;
        const resutlt = await $fetch('/api/search', {
            query,
    
        })
        searchResults.value = resutlt
    
    }catch (e) {
        const error = e as FetchError
        errorMessage.value = getFetchErrorMessage(error)
    }
        loading.value = false;
}

function setLocation(resutlt: NominatimResult) {
    emit('resultSelected', resutlt);
    searchResults.value = [];
    if (form.value){
        form.value.resetForm;
    }
}

</script>

<template>
    <div class="flex flex-col gap-2">
        <Form 
        ref="form"
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
                    :disabled="loading"
                    :class="{
                        'input-error': errors.q,
                    }"
                    />
                </label>
                <div v-if="errors.q" class="validator-hint text=error">
                     {{ errors.q }}
                </div>
            </div>
                <button 
                class="btn btn-neutral join-item"
                :disabled="loading"
                >
                
                Search
                </button>
            </div>
        </Form>
        <div 
        v-if="errorMessage"
        role="alert" 
        class="alert alert-error"
        >
            {{ errorMessage }}
        </div>
       
        <div v-if="loading" class="flex justify-center">
            <div class="loading loading-spinner loading-lg"> </div>
        </div>
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
                        @click="setLocation(resutlt)"
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