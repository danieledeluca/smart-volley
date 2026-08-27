<script setup lang="ts" generic="T extends z.ZodType">
import type { CheckboxGroupItem, InferInput, RadioGroupItem, SelectItem, SelectMenuItem } from '@nuxt/ui';
import type { LocationQueryRaw } from 'vue-router';
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

const router = useRouter();
const route = useRoute();

const openFilters = ref(false);

const firstFieldsGroup = computed(() => fields.at(0));
const secondFieldsGroup = computed(() => fields.at(1));

const activeFilters = computed(() => {
    if (!secondFieldsGroup.value?.length) {
        return [];
    }

    type ActiveFilter = {
        label: string;
        name: string & keyof FormData;
        value: string;
    };

    return secondFieldsGroup.value.reduce<ActiveFilter[]>((acc, field) => {
        const filterValue = state.value[field.formFieldProps.name];

        if (filterValue) {
            let value: string | undefined;

            if (field.renderAs === 'checkbox-group') {
                type CheckboxGroupItemWithValue = CheckboxGroupItem & { label: string; value: string };

                value = (field.checkboxGroupProps?.items as CheckboxGroupItemWithValue[] | undefined)
                    ?.filter((item) => (filterValue as string[]).includes(item.value))
                    ?.map((item) => item.label)
                    .join(', ');
            }

            if (field.renderAs === 'radio-group') {
                type RadioGroupItemWithValue = RadioGroupItem & { label: string; value: string };

                value = (field.radioGroupProps?.items as RadioGroupItemWithValue[] | undefined)
                    ?.find((item) => item.value === filterValue)
                    ?.label;
            }

            if (field.renderAs === 'select') {
                type SelectItemWithValue = SelectItem & { label: string; value: string };

                value = (field.selectProps?.items as SelectItemWithValue[] | undefined)
                    ?.find((item) => item.value === filterValue)
                    ?.label;
            }

            if (field.renderAs === 'select-menu') {
                type SelectMenuItemWithValue = SelectMenuItem & { label: string; value: string };

                value = (field.selectProps?.items as SelectMenuItemWithValue[] | undefined)
                    ?.find((item) => item.value === filterValue)
                    ?.label;
            }

            if (value) {
                acc.push({
                    label: field.formFieldProps.label || '',
                    name: field.formFieldProps.name,
                    value,
                });
            }
        }

        return acc;
    }, []);
});

function syncQueryParams() {
    const query: LocationQueryRaw = {
        ...route.query,
    };

    fields.flat().forEach((field) => query[field.formFieldProps.name] = getQueryParamValue(field));

    router.replace({ query });
    emit('update');
}

const debouncedSync = useDebounceFn(() => syncQueryParams(), 500);

function getQueryParamValue(field: FormField<FormData>) {
    const value = state.value[field.formFieldProps.name];

    if (field.renderAs === 'checkbox-group') {
        return value
            ? (value as string[]).length > 0
                    ? (value as string[]).join(',')
                    : undefined
            : undefined;
    }

    return value !== undefined && value !== '' ? String(value) : undefined;
}

function handleFormFieldUpdate(field: FormField<FormData>) {
    field.debounce ? debouncedSync() : syncQueryParams();
}

function handleClear() {
    if (activeFilters.value.length > 0) {
        debouncedSync.cancel();

        router.replace({ query: undefined });
        emit('clear');
    }
}

function handleRemoveFilter(filterName: keyof FormData) {
    state.value[filterName] = undefined;

    syncQueryParams();
}

onMounted(() => {
    syncQueryParams();
});
</script>

<template>
    <UForm :schema :state class="flex items-center gap-4 max-md:flex-wrap sm:gap-6">
        <FormField
            v-for="(field, index) in firstFieldsGroup"
            :key="index"
            v-model="state[field.formFieldProps.name]"
            :field
            class="max-sm:flex-1"
            @update:modelValue="handleFormFieldUpdate(field)"
        />
        <div v-if="activeFilters.length > 0" id="activeFilters" class="relative flex-1 overflow-hidden max-md:order-last max-md:basis-full">
            <div class="flex snap-x gap-2 overflow-y-auto max-md:-mb-2 max-md:pb-2 max-md:*:last:mr-16 md:overflow-hidden">
                <template v-for="filter in activeFilters" :key="filter.name">
                    <UButton
                        variant="soft"
                        color="neutral"
                        :label="`${filter.label}: ${filter.value}`"
                        trailingIcon="i-lucide-x"
                        size="sm"
                        class="snap-start"
                        @click="handleRemoveFilter(filter.name)"
                    />
                </template>
            </div>
            <div class="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-default" />
        </div>
        <div class="ml-auto flex gap-4 empty:hidden sm:gap-6">
            <slot />
            <AppSlideover
                v-if="(secondFieldsGroup?.length || 0) > 0"
                v-model:open="openFilters"
                :title="$t('form.filter.title')"
                :description="$t('form.filter.description')"
                :cancelButtonProps="{
                    label: $t('form.filter.button.clear'),
                    icon: 'i-lucide-filter-x',
                }"
                :submitButtonProps="{
                    label: $t('form.filter.button.apply'),
                }"
                @submit="openFilters = false"
                @cancel="handleClear"
            >
                <template #button>
                    <UChip :show="activeFilters.length > 0">
                        <UButton
                            variant="subtle"
                            color="neutral"
                            :label="$t('form.filter.button.open')"
                            icon="i-lucide-filter"
                        />
                    </UChip>
                </template>
                <div class="space-y-4">
                    <FormField
                        v-for="(field, index) in secondFieldsGroup"
                        :key="index"
                        v-model="state[field.formFieldProps.name]"
                        :field
                        @update:modelValue="handleFormFieldUpdate(field)"
                    />
                </div>
            </AppSlideover>
        </div>
    </UForm>
</template>
