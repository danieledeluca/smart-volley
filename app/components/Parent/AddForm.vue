<script setup lang="ts">
const parentsStore = useParentsStore();
const { isAddingParent, parentsAddFields } = storeToRefs(parentsStore);

const formRef = useTemplateRef('form');

defineExpose({
    submit: () => formRef.value?.submit(),
});

const state = reactive<Partial<AddParentSchema>>({
    name: undefined,
    tax_code: undefined,
    email: undefined,
});
</script>

<template>
    <UForm
        ref="form"
        :schema="addParentSchema"
        :state
        class="grid gap-4"
        @submit="parentsStore.addParent"
    >
        <FormField
            v-for="(field, index) in parentsAddFields"
            :key="index"
            v-model="(state[field.name] as FormFieldModelType)"
            :field
        />
        <UButton
            type="submit"
            label="Submit"
            class="hidden"
            :loading="isAddingParent"
            block
        />
    </UForm>
</template>
