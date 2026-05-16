<script setup lang="ts" generic="T extends Record<string, any>">
const { field } = defineProps<{
    field: FormField<T>;
}>();

const slots = defineSlots();
const model = defineModel<T[keyof T]>();
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
                <USelect
                    v-if="field.renderAs === 'select'"
                    v-model="model"
                    v-bind="field.selectProps"
                    class="w-full"
                />
                <USelectMenu
                    v-if="field.renderAs === 'select-menu'"
                    v-model="model"
                    v-bind="field.selectProps"
                    class="w-full"
                    valueKey="value"
                />
            </UFormField>
            <UButton
                v-if="field.renderAs.startsWith('select') && model"
                icon="i-lucide-x"
                variant="subtle"
                color="error"
                @click.stop="model = undefined"
            />
        </div>
        <template v-if="!!slots[`${field.formFieldProps.name}-post`]">
            <div class="mt-2">
                <slot :name="`${field.formFieldProps.name}-post`" />
            </div>
        </template>
    </div>
</template>
