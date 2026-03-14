<script setup lang="ts">
const activitiesStore = useActivitiesStore();
const { isAddingActivity, activityAddState, activityAddFields } = storeToRefs(activitiesStore);

const formRef = useTemplateRef('form');

defineExpose({
    submit: () => formRef.value?.submit(),
});
</script>

<template>
    <UForm
        ref="form"
        :schema="activityAddSchema"
        :state="activityAddState"
        class="grid gap-4"
        @submit="activitiesStore.addActivity"
    >
        <FormField
            v-for="(field, index) in activityAddFields"
            :key="index"
            v-model="(activityAddState[field.name] as FormFieldModelType)"
            :field
        />
        <UButton
            type="submit"
            :label="$t('form.button.add')"
            class="hidden"
            :loading="isAddingActivity"
            activityAddState
        />
    </UForm>
</template>
