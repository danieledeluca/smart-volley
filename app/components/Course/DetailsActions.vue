<script setup lang="ts">
import DetailsActions from '~/components/Details/Actions.vue';

const { courseId } = defineProps<{
    courseId: number;
}>();

const emit = defineEmits<{
    editComplete: [id?: number];
    editClose: [id?: number];
}>();

const courseEditFormRef = useTemplateRef('courseEditFormRef');

const openEdit = ref(false);
const updatedCourseId = ref<number>();

function handleEditSuccess(id?: number) {
    openEdit.value = false;
    updatedCourseId.value = id;

    emit('editComplete', id);
}
</script>

<template>
    <DetailsActions
        v-model:openEdit="openEdit"
        :pageId="courseId"
        :editModal="{
            title: $t('form.course.edit.title'),
            description: $t('form.course.edit.description'),
            isLoading: Boolean(courseEditFormRef?.isLoading()),
        }"
        @edit="courseEditFormRef?.submit"
        @editClose="emit('editClose', updatedCourseId)"
    >
        <template #edit>
            <CourseEditForm ref="courseEditFormRef" :courseId @success="handleEditSuccess" />
        </template>
    </DetailsActions>
</template>
