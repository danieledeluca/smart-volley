<script setup lang="ts">
import { InsertCourse } from '~~/lib/db/schema';

const { showSubmitButton = false } = defineProps<{
    showSubmitButton?: boolean;
}>();

const coursesStore = useCoursesStore();
const { isLoading, addingCourseErrors, courseAddState, courseAddFields } = storeToRefs(coursesStore);

const formRef = useTemplateRef('formRef');

watch(addingCourseErrors, (newErrors) => {
    formRef.value?.setErrors(newErrors);
});

defineExpose({
    submit: () => formRef.value?.submit(),
});
</script>

<template>
    <UForm
        ref="formRef"
        :schema="InsertCourse"
        :state="courseAddState"
        class="grid gap-8"
        @submit="coursesStore.addCourse"
    >
        <FormField
            v-for="(field, index) in courseAddFields"
            :key="index"
            v-model="courseAddState[field.formFieldProps.name]"
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
