<script setup lang="ts">
import type { InsertSeason } from '~~/lib/db/schema';

const state = defineModel<Partial<InsertSeason>>('state', {
    required: true,
});

const { formFields } = useForm('season');
</script>

<template>
    <FormField
        v-for="(field, index) in formFields"
        :key="index"
        v-model="state[field.formFieldProps.name]"
        :field
    />
</template>
