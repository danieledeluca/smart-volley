<script setup lang="ts">
import { InsertActivity } from '~~/lib/db/schema';

const { showSubmitButton = false } = defineProps<{
    showSubmitButton?: boolean;
}>();

const activitiesStore = useActivitiesStore();
const { isLoading, addingActivityErrors, activityAddState, activityAddFields } = storeToRefs(activitiesStore);

const formRef = useTemplateRef('formRef');

watch(addingActivityErrors, (newErrors) => {
    formRef.value?.setErrors(newErrors);
});

defineExpose({
    submit: () => formRef.value?.submit(),
});
</script>

<template>
    <UForm
        ref="formRef"
        :schema="InsertActivity"
        :state="activityAddState"
        class="grid gap-8"
        @submit="activitiesStore.addActivity"
    >
        <FormField
            v-for="(field, index) in activityAddFields"
            :key="index"
            v-model="activityAddState[field.formFieldProps.name]"
            :field
        />
        <UButton
            type="submit"
            :label="$t('form.button.add')"
            :loading="isLoading"
            :class="{ hidden: !showSubmitButton }"
            block
        />
    </UForm>
</template>
