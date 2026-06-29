<script setup lang="ts" generic="T extends Record<string, any>">
const { field, showDeleteButton = true } = defineProps<{
    field: FormField<T>;
    showDeleteButton?: boolean;
}>();

const slots = defineSlots();
const model = defineModel<T[keyof T]>();

function showField(field: FormField<T>) {
    if (field.renderAs.startsWith('input')) {
        return true;
    }

    if (field.renderAs === 'checkbox-group') {
        return field.checkboxGroupProps?.items && field.checkboxGroupProps.items.length > 0;
    }

    if (field.renderAs === 'radio-group') {
        return field.radioGroupProps?.items && field.radioGroupProps.items.length > 0;
    }

    if (field.renderAs === 'select' || field.renderAs === 'select-menu') {
        return field.selectProps?.items && field.selectProps.items.length > 0;
    }

    return false;
}
</script>

<template>
    <div>
        <div class="flex items-end gap-2">
            <UFormField v-bind="field.formFieldProps" class="min-w-0 flex-1">
                <UInput
                    v-if="field.renderAs === 'input'"
                    v-model="model"
                    v-bind="field.inputProps"
                    class="w-full"
                />
                <FormFieldNumber
                    v-if="field.renderAs === 'input-number'"
                    v-model="model"
                    :inputProps="field.inputProps"
                />
                <FormFieldDate
                    v-if="field.renderAs === 'input-date'"
                    v-model="model"
                    :inputProps="field.inputProps"
                    :calendarProps="field.calendarProps"
                />
                <FormFieldFile
                    v-if="field.renderAs === 'input-file'"
                    v-model="model"
                    :fileUploadProps="field.fileUploadProps"
                    :buttonProps="field.buttonProps"
                />
                <template v-if="field.renderAs === 'checkbox-group'">
                    <UCheckboxGroup
                        v-if="showField(field)"
                        v-model="model"
                        v-bind="field.checkboxGroupProps"
                    />
                    <UAlert
                        v-else
                        variant="subtle"
                        color="warning"
                        :title="$t('form.warning.no_data')"
                        icon="i-lucide-triangle-alert"
                    />
                </template>
                <template v-if="field.renderAs === 'radio-group'">
                    <URadioGroup
                        v-if="showField(field)"
                        v-model="model"
                        v-bind="field.radioGroupProps"
                    />
                    <UAlert
                        v-else
                        variant="subtle"
                        color="warning"
                        :title="$t('form.warning.no_data')"
                        icon="i-lucide-triangle-alert"
                    />
                </template>
                <template v-if="field.renderAs === 'select'">
                    <USelect
                        v-if="showField(field)"
                        v-model="model"
                        v-bind="field.selectProps"
                        class="w-full"
                    />
                    <UAlert
                        v-else
                        variant="subtle"
                        color="warning"
                        :title="$t('form.warning.no_data')"
                        icon="i-lucide-triangle-alert"
                    />
                </template>
                <USelectMenu
                    v-if="field.renderAs === 'select-menu'"
                    v-model="model"
                    v-bind="field.selectProps"
                    class="w-full"
                    valueKey="value"
                />
                <template v-if="showDeleteButton && field.renderAs === 'radio-group' && model" #hint>
                    <UButton
                        variant="link"
                        color="error"
                        :label="$t('form.button.delete')"
                        :ui="{
                            base: 'p-0',
                        }"
                        @click.stop="model = undefined"
                    />
                </template>
            </UFormField>
            <UButton
                v-if="showDeleteButton && field.renderAs.startsWith('select') && model"
                icon="i-lucide-x"
                variant="subtle"
                color="error"
                @click.stop="model = undefined"
            />
        </div>
        <div v-if="!!slots[`${field.formFieldProps.name}-post`]" class="mt-2">
            <slot :name="`${field.formFieldProps.name}-post`" />
        </div>
    </div>
</template>
