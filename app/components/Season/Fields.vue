<script setup lang="ts">
import type { InsertSeason } from '~~/lib/db/schema';

const { formAction } = defineProps<{
    formAction: FormAction;
}>();

const state = defineModel<Partial<InsertSeason>>('state', {
    required: true,
});

const { formFields } = useForm('season', formAction);
</script>

<template>
    <div class="space-y-4">
        <FormField
            v-for="(field, index) in formFields"
            :key="index"
            v-model="state[field.formFieldProps.name]"
            :field
        />
    </div>
</template>
