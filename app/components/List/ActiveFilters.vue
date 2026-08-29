<script setup lang="ts" generic="T = object">
import type { CheckboxGroupItem, RadioGroupItem, SelectItem, SelectMenuItem } from '@nuxt/ui';

type ActiveFilter = {
    label: string;
    name: string & keyof T;
    value: string;
};

const { fields } = defineProps<{
    fields: FormField<T>[];
}>();

const emit = defineEmits<{
    remove: [filterName: keyof T];
}>();

const state = defineModel<Partial<T>>('state', {
    required: true,
});

const activeFilters = computed(() => {
    if (!fields.length) {
        return [];
    }

    return fields.reduce<ActiveFilter[]>((acc, field) => {
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

defineExpose({
    activeFilters: () => activeFilters.value,
});
</script>

<template>
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
                    @click="emit('remove', filter.name)"
                />
            </template>
        </div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-default" />
    </div>
</template>
