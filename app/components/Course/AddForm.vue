<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { SelectCourse } from '~~/lib/db/schema';

import { InsertCourse } from '~~/lib/db/schema';

const emit = defineEmits<{
    success: [id?: number];
}>();

const { $csrfFetch } = useNuxtApp();
const coursesStore = useCoursesStore();
const courseFormRef = useTemplateRef('courseFormRef');
const { initialState } = useForm('course');

const state = ref({ ...initialState });
const insertedCourse = ref<SelectCourse>();

async function onSubmit(event: FormSubmitEvent<InsertCourse>) {
    const course = await $csrfFetch<SelectCourse>('/api/courses', {
        method: 'POST',
        body: event.data,
    });

    insertedCourse.value = course;
}

function onSubmitSuccess() {
    state.value = { ...initialState };

    coursesStore.refreshCourses();

    emit('success', insertedCourse.value?.id);
}

defineExpose({
    submit: () => courseFormRef.value?.submit(),
    isLoading: () => courseFormRef.value?.isLoading,
});
</script>

<template>
    <BaseForm
        ref="courseFormRef"
        v-model:state="state"
        :schema="InsertCourse"
        :onSubmit
        :onSubmitSuccess
        :submitButtonLabel="$t('form.button.add')"
        :successMessage="$t('form.course.add.success')"
    >
        <CourseFields v-model:state="state" formAction="add" />
    </BaseForm>
</template>
