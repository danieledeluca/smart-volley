<script setup lang="ts">
import type { InsertCourse } from '~~/lib/db/schema';

const state = defineModel<Partial<InsertCourse>>('state', {
    required: true,
});

const { formFields } = useForm('course');
</script>

<template>
    <FormField
        v-for="(field, index) in formFields"
        :key="index"
        v-model="state[field.formFieldProps.name]"
        :field
    />
</template>
