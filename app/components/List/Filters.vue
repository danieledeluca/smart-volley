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

const open = ref(false);

const firstFieldsGroup = computed(() => fields.at(0));
const secondFieldsGroup = computed(() => fields.at(1));

const hasActiveFilters = computed(() => {
    if (secondFieldsGroup.value) {
        const hiddenFiltersName = secondFieldsGroup.value.map((field) => field.name);

        const filteredState = (Object.keys(state.value) as (keyof FormData & string)[]).filter((key) => {
            return hiddenFiltersName.includes(key);
        });

        return filteredState.some((name) => !!state.value[name]);
    }

    return false;
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
    <UCard variant="subtle">
        <UForm
            :schema="schema"
            :state="state"
            class="flex gap-4 max-md:flex-col md:items-end"
        >
            <FormField
                v-for="(field, index) in firstFieldsGroup"
                :key="index"
                v-model="state[field.name]"
                :field
                class="flex-1"
                @update:model-value="handleFormFieldUpdate(field)"
            />
            <div>
                <USlideover
                    v-if="secondFieldsGroup && secondFieldsGroup.length > 0"
                    v-model:open="open"
                    :title="$t('form.filter.title')"
                    :description="$t('form.filter.description')"
                >
                    <UChip :show="hasActiveFilters" class="w-full">
                        <UButton
                            :label="$t('form.filter.button.open')"
                            variant="subtle"
                            color="neutral"
                            icon="i-lucide-filter"
                            block
                        />
                    </UChip>
                    <template #body>
                        <div class="space-y-4">
                            <FormField
                                v-for="(field, index) in secondFieldsGroup"
                                :key="index"
                                v-model="state[field.name]"
                                :field
                                @update:model-value="handleFormFieldUpdate(field)"
                            />
                        </div>
                    </template>
                    <template #footer>
                        <UButton
                            variant="outline"
                            color="neutral"
                            :label="$t('form.filter.button.clear')"
                            icon="i-lucide-filter-x"
                            block
                            @click="handleClear"
                        />
                        <UButton
                            variant="solid"
                            :label="$t('form.filter.button.close')"
                            block
                            @click="open = false"
                        />
                    </template>
                </USlideover>
            </div>
        </UForm>
    </UCard>
</template>
