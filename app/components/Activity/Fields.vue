<script setup lang="ts">
import type { InsertActivity } from '~~/lib/db/schema';

const state = defineModel<Partial<InsertActivity>>('state', {
    required: true,
});

const { formFields } = useForm('activity');
</script>

<template>
    <FormField
        v-for="(field, index) in formFields"
        :key="index"
        v-model="state[field.formFieldProps.name]"
        :field
    />
</template>
