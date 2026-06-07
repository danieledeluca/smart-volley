<script setup lang="ts">
import type { ButtonProps, FileUploadProps } from '@nuxt/ui';

const { fileUploadProps, buttonProps } = defineProps<{
    fileUploadProps?: FileUploadProps;
    buttonProps?: ButtonProps;
}>();

const model = defineModel<File>();

const { emitFormBlur } = useFormField();

const showButton = computed(() => {
    return JSON.stringify(fileUploadProps?.interactive) ? !fileUploadProps?.interactive : false;
});

watch(model, () => emitFormBlur());
</script>

<template>
    <UFileUpload
        v-model="model"
        v-bind="fileUploadProps"
        :label="fileUploadProps?.label || $t('form.field.file_upload.label')"
        :icon="fileUploadProps?.icon || 'i-lucide-image'"
    >
        <template v-if="showButton" #actions="{ open }">
            <UButton
                v-bind="buttonProps"
                :label="buttonProps?.label || $t('form.field.file_upload.button.label')"
                :icon="buttonProps?.icon || 'i-lucide-upload'"
                @click="open()"
            />
        </template>
    </UFileUpload>
</template>
