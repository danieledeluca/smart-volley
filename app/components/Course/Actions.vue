<script setup lang="ts">
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

const isLoading = computed(() => Boolean(courseEditFormRef.value?.isLoading()));

function handleEditSuccess(id?: number) {
    openEdit.value = false;
    updatedCourseId.value = id;

    emit('editComplete', id);
}
</script>

<template>
    <ListTableActions
        v-model:openEdit="openEdit"
        :pageId="courseId"
        :copy="{
            label: $t('table.action.copy.label', { name: $t('table.action.copy.course_id') }),
            successMessage: $t('toast.copy', { name: $t('table.action.copy.course_id') }),
        }"
        :edit="{
            label: $t('table.action.edit.course'),
            title: $t('form.course.edit.title'),
            description: $t('form.course.edit.description'),
        }"
        :isLoading
        @edit="courseEditFormRef?.submit"
        @editClose="emit('editClose', updatedCourseId)"
    >
        <template #edit>
            <CourseEditForm ref="courseEditFormRef" :courseId @success="handleEditSuccess" />
        </template>
    </ListTableActions>
</template>
