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
        return (field.checkboxGroupProps?.items?.length || 0) > 0;
    }

    if (field.renderAs === 'radio-group') {
        return (field.radioGroupProps?.items?.length || 0) > 0;
    }

    if (field.renderAs === 'select' || field.renderAs === 'select-menu') {
        if (field.selectProps?.loading) {
            return true;
        }

        return (field.selectProps?.items?.length || 0) > 0;
    }

    return false;
}
</script>

<template>
    <div>
        <UFormField v-bind="field.formFieldProps" class="min-w-0 flex-1">
            <UInput
                v-if="field.renderAs === 'input'"
                v-model="model"
                v-bind="field.inputProps"
                class="flex w-full items-center gap-2"
            >
                <template
                    v-if="!!slots[`${field.formFieldProps.name}-leading`] && !field.inputProps?.leadingIcon"
                    #leading
                >
                    <slot :name="`${field.formFieldProps.name}-leading`" />
                </template>
                <template v-if="!!slots[`${field.formFieldProps.name}-input-after`]">
                    <slot :name="`${field.formFieldProps.name}-input-after`" />
                </template>
            </UInput>
            <FormFieldNumber
                v-else-if="field.renderAs === 'input-number'"
                v-model="model"
                :inputProps="field.inputProps"
            />
            <FormFieldDate
                v-else-if="field.renderAs === 'input-date'"
                v-model="model"
                :inputProps="field.inputProps"
                :calendarProps="field.calendarProps"
            />
            <FormFieldFile
                v-else-if="field.renderAs === 'input-file'"
                v-model="model"
                :fileUploadProps="field.fileUploadProps"
                :buttonProps="field.buttonProps"
            />
            <FormFieldAddress
                v-else-if="field.renderAs === 'input-address'"
                v-model="model"
                :inputProps="field.inputProps"
                :autocompleteOptions="field.autocompleteOptions"
            />
            <template v-else-if="field.renderAs === 'checkbox-group'">
                <UCheckboxGroup
                    v-if="showField(field)"
                    v-model="model"
                    v-bind="field.checkboxGroupProps"
                />
                <FormNoData v-else />
            </template>
            <template v-else-if="field.renderAs === 'radio-group'">
                <URadioGroup
                    v-if="showField(field)"
                    v-model="model"
                    v-bind="field.radioGroupProps"
                />
                <FormNoData v-else />
            </template>
            <div v-else-if="field.renderAs === 'select'" class="flex gap-2">
                <USelect
                    v-if="showField(field)"
                    v-model="model"
                    v-bind="field.selectProps"
                    class="w-full"
                />
                <FormNoData v-else />
                <FormDeleteButton v-if="showDeleteButton && model" v-model="model" />
            </div>
            <div v-else-if="field.renderAs === 'select-menu'" class="flex gap-2">
                <USelectMenu
                    v-if="showField(field)"
                    v-model="model"
                    v-bind="field.selectProps"
                    class="w-full"
                    valueKey="value"
                />
                <FormNoData v-else />
                <FormDeleteButton v-if="showDeleteButton && model" v-model="model" />
            </div>
            <template v-if="showDeleteButton && field.renderAs === 'radio-group' && model" #hint>
                <UButton
                    variant="link"
                    color="error"
                    :label="$t('form.button.delete')"
                    :ui="{ base: 'p-0' }"
                    @click.stop="model = undefined"
                />
            </template>
        </UFormField>
        <div v-if="!!slots[`${field.formFieldProps.name}-post`]" class="mt-2">
            <slot :name="`${field.formFieldProps.name}-post`" />
        </div>
    </div>
</template>
