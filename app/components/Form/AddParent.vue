<script setup lang="ts">
const parentsStore = useParentsStore();
const { isAddingParent, parentAddState, parentsAddFields } = storeToRefs(parentsStore);

const formRef = useTemplateRef('form');

defineExpose({
    submit: () => formRef.value?.submit(),
});
</script>

<template>
    <UForm
        ref="form"
        :schema="parentAddSchema"
        :state="parentAddState"
        class="grid gap-4"
        @submit="parentsStore.addParent"
    >
        <FormField
            v-for="(field, index) in parentsAddFields"
            :key="index"
            v-model="(parentAddState[field.name] as FormFieldModelType)"
            :field
        />
        <UButton
            type="submit"
            :label="$t('form.button.add')"
            class="hidden"
            :loading="isAddingParent"
            block
        />
    </UForm>
</template>
