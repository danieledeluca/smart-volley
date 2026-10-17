<script setup lang="ts">
import Actions from '~/components/Details/Actions.vue';

const { courseId } = defineProps<{
    courseId: number;
}>();

const emit = defineEmits<{
    editSuccess: [id?: number];
}>();

const courseEditFormRef = useTemplateRef('courseEditFormRef');

const openEdit = ref(false);
const updatedCourseId = ref<number>();

function handleEditSuccess(id?: number) {
    openEdit.value = false;
    updatedCourseId.value = id;

    emit('editSuccess', id);
}
</script>

<template>
    <Actions
        v-model:openEdit="openEdit"
        :pageId="courseId"
        :editModal="{
            title: $t('form.course.edit.title'),
            description: $t('form.course.edit.description'),
            isLoading: courseEditFormRef?.isLoading(),
        }"
        @edit="courseEditFormRef?.submit"
    >
        <template #edit>
            <CourseEditForm ref="courseEditFormRef" :courseId @success="handleEditSuccess" />
        </template>
    </Actions>
</template>
