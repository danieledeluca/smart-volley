<script setup lang="ts">
import type { InsertActivity } from '~~/lib/db/schema';

const { formAction } = defineProps<{
    formAction: FormAction;
}>();

const state = defineModel<Partial<InsertActivity>>('state', {
    required: true,
});

const { formFields } = useForm('activity', formAction);
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
