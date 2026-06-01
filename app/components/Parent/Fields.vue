<script setup lang="ts">
import type { InsertParent } from '~~/lib/db/schema';

const state = defineModel<Partial<InsertParent>>('state', {
    required: true,
});

const { formFields } = useForm('parent');
</script>

<template>
    <FormFieldGroup
        v-for="(group, index) in formFields"
        :key="index"
        :title="group.title"
        :icon="group.icon"
    >
        <FormField
            v-for="(field, fieldIndex) in group.fields"
            :key="fieldIndex"
            v-model="state[field.formFieldProps.name]"
            :field
        />
    </FormFieldGroup>
</template>
