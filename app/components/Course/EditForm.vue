<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { UpdatedParent } from '~~/lib/db/schema';

import { InsertCourse } from '~~/lib/db/schema';

const { courseId } = defineProps<{
    courseId: number;
}>();

const emit = defineEmits<{
    success: [id?: number];
}>();

const { data: course, pending, error } = useLazyFetch(`/api/courses/${courseId}`);

const coursesStore = useCoursesStore();
const { $csrfFetch } = useNuxtApp();
const courseFormRef = useTemplateRef('courseFormRef');
const { initialState } = useForm('course');

const state = ref({ ...initialState });
const updatedCourse = ref<UpdatedParent>();

async function onSubmit(event: FormSubmitEvent<InsertCourse>) {
    const course = await $csrfFetch<UpdatedParent>(`/api/courses/${courseId}`, {
        method: 'PUT',
        body: event.data,
    });

    updatedCourse.value = course;
}

function onSubmitComplete() {
    coursesStore.refreshCourses();

    emit('success', updatedCourse.value?.id);
}

watchEffect(() => {
    if (course.value) {
        state.value = {
            code: course.value.code,
            name: course.value.name ?? undefined,
            activityId: course.value.activityId,
        };
    }
});

defineExpose({
    submit: () => courseFormRef.value?.submit(),
    isLoading: () => courseFormRef.value?.isLoading,
});
</script>

<template>
    <CourseEditFormLoader v-if="pending" />
    <UAlert
        v-else-if="error"
        :title="error.statusMessage"
        color="error"
        icon="i-lucide-circle-x"
    />
    <BaseForm
        v-else-if="course"
        ref="courseFormRef"
        v-model:state="state"
        :schema="InsertCourse"
        :onSubmit
        :onSubmitComplete
        :submitButtonLabel="$t('form.button.edit')"
        :successMessage="$t('form.course.edit.success')"
    >
        <CourseFields v-model:state="state" />
    </BaseForm>
</template>
