<script setup lang="ts" generic="T extends z.ZodType">
import type { InferInput } from '@nuxt/ui';
import type z from 'zod';

import { useDebounceFn } from '@vueuse/core';

type FormData = InferInput<T>;

const { schema, fields } = defineProps<{
    schema: T;
    fields: FormField<FormData>[][];
}>();

const emit = defineEmits<{
    update: [];
    clear: [];
}>();

const state = defineModel<Partial<FormData>>('state', {
    required: true,
});

const firstFieldsGroup = computed(() => fields.at(0));
const secondFieldsGroup = computed(() => fields.at(1));

const hasActiveFilters = computed(() => {
    if (!secondFieldsGroup.value) {
        return false;
    }

    const filtersName = secondFieldsGroup.value.map((field) => field.formFieldProps.name);

    return filtersName.some((name) => Boolean(state.value[name]));
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

function handleClear() {
    if (hasActiveFilters.value) {
        emit('clear');
    }
}
</script>

<template>
    <UForm :schema :state class="flex gap-4">
        <FormField
            v-for="(field, index) in firstFieldsGroup"
            :key="index"
            v-model="state[field.formFieldProps.name]"
            :field
            @update:modelValue="handleFormFieldUpdate(field)"
        />
        <div v-if="(secondFieldsGroup?.length || 0) > 0" class="ml-auto">
            <USlideover
                :title="$t('form.filter.title')"
                :description="$t('form.filter.description')"
            >
                <UChip :show="hasActiveFilters" class="w-full">
                    <UButton
                        :label="$t('form.filter.button.open')"
                        variant="subtle"
                        color="neutral"
                        icon="i-lucide-filter"
                    />
                </UChip>
                <template #body>
                    <div class="space-y-4">
                        <FormField
                            v-for="(field, index) in secondFieldsGroup"
                            :key="index"
                            v-model="state[field.formFieldProps.name]"
                            :field
                            @update:modelValue="handleFormFieldUpdate(field)"
                        />
                    </div>
                </template>
                <template #footer="{ close }">
                    <UButton
                        :label="$t('form.filter.button.clear')"
                        variant="outline"
                        color="neutral"
                        icon="i-lucide-filter-x"
                        block
                        @click="handleClear"
                    />
                    <UButton
                        :label="$t('form.filter.button.apply')"
                        variant="solid"
                        block
                        @click="close"
                    />
                </template>
            </USlideover>
        </div>
    </UForm>
</template>
