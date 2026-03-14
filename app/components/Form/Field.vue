<script setup lang="ts" generic="T extends Record<string, FormFieldModelType>">
import type { InputDateProps, InputNumberProps, InputProps, SelectMenuProps, SelectProps } from '@nuxt/ui';

const { field } = defineProps<{
    field: FormField<T>;
}>();

const slots = defineSlots();

const model = defineModel<T[keyof T]>();

const fieldInputProps = computed(() => {
    const { renderAs, label, required, name, debounce, ...rest } = field;
    return rest;
});
</script>

<template>
    <div>
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
                        v-bind="(fieldInputProps as InputProps)"
                        class="w-full"
                    />
                    <FormFIeldNumber
                        v-else-if="field.renderAs === 'input-number'"
                        v-model="model"
                        :inputProps="(fieldInputProps as InputNumberProps)"
                    />
                    <FormFieldDate
                        v-else-if="field.renderAs === 'input-date'"
                        v-model="model"
                        :inputProps="(fieldInputProps as InputDateProps)"
                    />
                </template>
                <template v-else-if="field.renderAs.startsWith('select')">
                    <USelect
                        v-if="field.renderAs === 'select'"
                        v-model="model"
                        v-bind="(fieldInputProps as SelectProps)"
                        class="w-full"
                    />
                    <USelectMenu
                        v-if="field.renderAs === 'select-menu'"
                        v-model="model"
                        v-bind="(fieldInputProps as SelectMenuProps)"
                        class="w-full"
                        valueKey="value"
                    />
                </template>
            </UFormField>
            <UButton
                v-if="field.renderAs.startsWith('select') && model"
                icon="i-lucide-x"
                variant="subtle"
                color="error"
                @click.stop="model = undefined"
            />
        </div>
        <template v-if="!!slots[`${field.name}-post`]">
            <div class="mt-2">
                <slot :name="`${field.name}-post`" />
            </div>
        </template>
    </div>
</template>
