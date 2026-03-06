<script setup lang="ts" generic="T extends z.ZodType">
import type { InferInput } from '@nuxt/ui';
import type z from 'zod';

import { useDebounceFn } from '@vueuse/core';

type FormData = InferInput<T>;

const { schema, fields } = defineProps<{
    schema: T;
    fields: FormField<FormData>[];
}>();

const emit = defineEmits<{
    update: [];
}>();

const state = defineModel<Partial<FormData>>('state', {
    required: true,
});

const debouncedEmitUpdate = useDebounceFn(() => {
    emit('update');
}, 500);

function handleFormFieldUpdate(field: FormField<FormData>) {
    if (field.debounce) {
        debouncedEmitUpdate();
    } else {
        emit('update');
    }
}
</script>

<template>
    <UCard variant="subtle">
        <UForm
            :schema="schema"
            :state="state"
            class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] items-start gap-4"
        >
            <FormField
                v-for="(field, index) in fields"
                :key="index"
                v-model="state[field.name]"
                :field
                @update:model-value="handleFormFieldUpdate(field)"
            />
        </UForm>
    </UCard>
</template>
