<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { InsertedCourse } from '~~/lib/db/schema';

import { InsertCourse } from '~~/lib/db/schema';

const emit = defineEmits<{
    success: [id?: number];
}>();

const coursesStore = useCoursesStore();
const { $csrfFetch } = useNuxtApp();
const courseFormRef = useTemplateRef('courseFormRef');
const { initialState } = useForm('course');

const state = ref({ ...initialState });
const insertedCourse = ref<InsertedCourse>();

async function onSubmit(event: FormSubmitEvent<InsertCourse>) {
    const course = await $csrfFetch<InsertedCourse>('/api/courses', {
        method: 'POST',
        body: event.data,
    });

    insertedCourse.value = course;
}

function onSubmitComplete() {
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
        :onSubmitComplete
        :submitButtonLabel="$t('form.button.add')"
        :successMessage="$t('form.course.add.success')"
    >
        <CourseFields v-model:state="state" />
    </BaseForm>
</template>
