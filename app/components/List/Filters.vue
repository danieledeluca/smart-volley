<script setup lang="ts" generic="T = object">
const { fields: fieldGroups } = defineProps<{
    fields: FormFieldGroup<T>[];
}>();

const emit = defineEmits<{
    update: [];
    clear: [];
}>();

const state = defineModel<Partial<T>>('state', {
    required: true,
});

const activeFiltersRef = useTemplateRef('activeFiltersRef');
const openFilters = ref(false);

const fields = computed(() => fieldGroups.map((group) => group.fields).flat());

function handleUpdate(key: string, value?: Partial<T>[keyof T]) {
    setQueryValue(key, value ? String(value) : undefined);
    emit('update');
}

function handleCancel() {
    if ((activeFiltersRef.value?.activeFilters().length || 0) > 0) {
        clearQuery();
        emit('clear');
    }
}

function handleRemove(filterName: keyof T) {
    state.value[filterName] = undefined;

    handleUpdate(filterName.toString(), undefined);
}

onMounted(() => {
    const values = Object.fromEntries(fields.value.map((field) => {
        const value = state.value[field.formFieldProps.name];

        return [field.formFieldProps.name, value ? String(value) : undefined];
    }));

    setQueryValues(values);
});
</script>

<template>
    <ListActiveFilters
        ref="activeFiltersRef"
        v-model:state="state"
        :fields
        @remove="handleRemove"
    />
    <div class="ml-auto flex gap-4 empty:hidden sm:gap-6">
        <slot />
        <AppSlideover
            v-if="fields.length > 0"
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
            @cancel="handleCancel"
        >
            <template #button>
                <UChip :show="(activeFiltersRef?.activeFilters().length || 0) > 0">
                    <UButton
                        variant="subtle"
                        color="neutral"
                        :label="$t('form.filter.button.open')"
                        icon="i-lucide-filter"
                    />
                </UChip>
            </template>
            <div class="space-y-8">
                <FormFieldGroup
                    v-for="(group, index) in fieldGroups"
                    :key="index"
                    :title="group.title"
                    :icon="group.icon"
                >
                    <FormField
                        v-for="(field, fieldIndex) in group.fields"
                        :key="fieldIndex"
                        v-model="state[field.formFieldProps.name]"
                        :field
                        @update:modelValue="(value) => handleUpdate(field.formFieldProps.name, value)"
                    />
                </FormFieldGroup>
            </div>
        </AppSlideover>
    </div>
</template>
