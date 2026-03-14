<script setup lang="ts">
const coursesStore = useCoursesStore();
const { isAddingCourse, courseAddState, courseAddFields } = storeToRefs(coursesStore);

const formRef = useTemplateRef('form');

defineExpose({
    submit: () => formRef.value?.submit(),
});
</script>

<template>
    <UForm
        ref="form"
        :schema="courseAddSchema"
        :state="courseAddState"
        class="grid gap-8"
        @submit="coursesStore.addCourse"
    >
        <FormField
            v-for="(field, index) in courseAddFields"
            :key="index"
            v-model="(courseAddState[field.name] as FormFieldModelType)"
            :field
        />
        <UButton
            type="submit"
            :label="$t('form.button.add')"
            class="hidden"
            :loading="isAddingCourse"
            block
        />
    </UForm>
</template>
