<script setup lang="ts" generic="T = object">
import type { LocationQueryRaw } from 'vue-router';

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

const router = useRouter();
const route = useRoute();

const activeFiltersRef = useTemplateRef('activeFiltersRef');
const openFilters = ref(false);

const fields = computed(() => fieldGroups.map((group) => group.fields).flat());

function getQueryParamValue(field: FormField<T>) {
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

function handleFormFieldUpdate() {
    const query: LocationQueryRaw = {
        ...route.query,
    };

    fields.value.forEach((field) => query[field.formFieldProps.name] = getQueryParamValue(field));

    router.replace({ query });
    emit('update');
}

function handleClear() {
    if ((activeFiltersRef.value?.activeFilters().length || 0) > 0) {
        router.replace({ query: undefined });
        emit('clear');
    }
}

function handleRemove(filterName: keyof T) {
    state.value[filterName] = undefined;

    handleFormFieldUpdate();
}

onMounted(() => {
    handleFormFieldUpdate();
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
            @cancel="handleClear"
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
                        @update:modelValue="handleFormFieldUpdate"
                    />
                </FormFieldGroup>
            </div>
        </AppSlideover>
    </div>
</template>
