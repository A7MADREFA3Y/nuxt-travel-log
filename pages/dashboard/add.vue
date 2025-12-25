<script lang="ts" setup>
import { InsertLocation } from '~/lib/db/schema';
import { toTypedSchema } from '@vee-validate/zod';
import { error } from 'better-auth/api';

const { handleSubmit, errors } = useForm({
    validationSchema: toTypedSchema(InsertLocation),

});

const onSubmit = handleSubmit((values) => {
    console.log(values);
})
</script>

<template>
<div class="container max-w-md mx-auto">
    <div class="my-4">
        <h1 class="text-lg">
            Add Location
        </h1>
        <p class="text-sm">
            A location is a place that you have or will travel to. It can be a city, country, state or point of interest.
            You can specify the times you visited the location after adding it. 
        </p>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
        
        <AppFormField label="Name" name="name" :error="errors.name"/>
        <AppFormField 
            label="description"
            name="Description"
            type="textarea"
            :error="errors.name"
        />
        
        <AppFormField 
            label="Latitude"
            name="lat" 
            :error="errors.name"
        />

        <AppFormField 
            label="Longitude"
            name="long" 
            :error="errors.name"
        />
        <div class="flex justify-end gap-2">
            <button type="button" class="btn btn-outline">
                <Icon name="tabler:arrow-left" size="24"/>        
                Cancel
            </button>
            <button type="submit" class="btn btn-primary">
                Add
                <Icon name="tabler:circle-plus-filled" size="24"/>        
            </button>
        </div>
    </form>
</div>

</template>