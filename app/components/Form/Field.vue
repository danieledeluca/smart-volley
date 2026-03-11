<script setup lang="ts" generic="T extends Record<string, FormFieldModelType>">
import type { InputProps, SelectMenuProps, SelectProps } from '@nuxt/ui';

const { field } = defineProps<{
    field: FormField<T>;
}>();

const slots = defineSlots();

const model = defineModel<T[keyof T]>();

const fieldInputProps = computed(() => {
    const { renderAs, label, required, name, ...rest } = field;
    return rest;
});

const inputProps = computed(() => fieldInputProps.value as InputProps);
const selectProps = computed(() => fieldInputProps.value as SelectProps);
const selectMenuProps = computed(() => fieldInputProps.value as SelectMenuProps);

const hasValue = computed(() => Array.isArray(model.value) ? model.value.length > 0 : !!model.value);
</script>

<template>
    <div class="flex items-end gap-2">
        <UFormField
            :name="field.name"
            :label="field.label"
            class="min-w-0 flex-1"
            :required="field.required"
        >
            <template v-if="field.renderAs.startsWith('input')">
                <UInput
                    v-if="field.renderAs === 'input'"
                    v-model="model"
                    v-bind="inputProps"
                    class="w-full"
                />
                <FormFieldDate v-else-if="field.renderAs === 'input-date'" v-model="model" :fieldName="field.name" />
            </template>
            <template v-else-if="field.renderAs.startsWith('select')">
                <USelect
                    v-if="field.renderAs === 'select'"
                    v-model="model"
                    v-bind="selectProps"
                    class="w-full"
                />
                <USelectMenu
                    v-if="field.renderAs === 'select-menu'"
                    v-model="model"
                    v-bind="selectMenuProps"
                    class="w-full"
                    valueKey="value"
                />
            </template>
            <template v-if="!!slots[`${field.name}-hint`]" #hint>
                <slot :name="`${field.name}-hint`" />
            </template>
        </UFormField>
        <UButton
            v-if="field.renderAs.startsWith('select') && hasValue"
            icon="i-lucide-x"
            variant="subtle"
            color="error"
            @click.stop="model = undefined"
        />
    </div>
</template>
