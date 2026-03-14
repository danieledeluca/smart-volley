<script setup lang="ts">
const parentsStore = useParentsStore();
const { isAddingParent, parentAddState, parentAddFields } = storeToRefs(parentsStore);

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
        class="grid gap-8"
        @submit="parentsStore.addParent"
    >
        <FormFieldGroup v-for="(group, index) in parentAddFields" :key="index" :group>
            <FormField
                v-for="(field, fieldIndex) in group.fields"
                :key="fieldIndex"
                v-model="(parentAddState[field.name] as FormFieldModelType)"
                :field
            />
        </FormFieldGroup>
        <UButton
            type="submit"
            :label="$t('form.button.add')"
            class="hidden"
            :loading="isAddingParent"
            block
        />
    </UForm>
</template>
