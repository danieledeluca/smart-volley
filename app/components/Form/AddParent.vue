<script setup lang="ts">
import { InsertParent } from '~~/lib/db/schema';

const { showSubmitButton = false } = defineProps<{
    showSubmitButton?: boolean;
}>();

const parentsStore = useParentsStore();
const { isAddingParent, addingParentErrors, parentAddState, parentAddFields } = storeToRefs(parentsStore);

const formRef = useTemplateRef('formRef');

watch(addingParentErrors, (newErrors) => {
    formRef.value?.setErrors(newErrors);
});

defineExpose({
    submit: () => formRef.value?.submit(),
});
</script>

<template>
    <UForm
        ref="formRef"
        :schema="InsertParent"
        :state="parentAddState"
        class="grid gap-8"
        @submit="parentsStore.addParent"
    >
        <FormFieldGroup
            v-for="(group, index) in parentAddFields"
            :key="index"
            :title="group.title"
            :icon="group.icon"
        >
            <FormField
                v-for="(field, fieldIndex) in group.fields"
                :key="fieldIndex"
                v-model="parentAddState[field.formFieldProps.name]"
                :field
            />
        </FormFieldGroup>
        <UButton
            type="submit"
            :label="$t('form.button.add')"
            :loading="isAddingParent"
            :class="{ hidden: !showSubmitButton }"
            block
        />
    </UForm>
</template>
