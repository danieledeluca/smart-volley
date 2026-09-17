<script setup lang="ts">
const { enrollmentId } = defineProps<{
    enrollmentId: number;
}>();

const emit = defineEmits<{
    deleteComplete: [];
    deleteClose: [];
    editComplete: [id?: number];
    editClose: [id?: number];
}>();

const route = useRoute();

const enrollmentEditFormRef = useTemplateRef('enrollmentEditFormRef');
const enrollmentDeleteFormRef = useTemplateRef('enrollmentDeleteFormRef');

const openDelete = ref(false);
const openEdit = ref(false);

const updatedEnrollmentId = ref<number>();

const isLoading = computed(() => {
    return Boolean(enrollmentEditFormRef.value?.isLoading()) || Boolean(enrollmentDeleteFormRef.value?.isLoading());
});

function handleDeleteSuccess() {
    openDelete.value = false;

    emit('deleteComplete');
}

function handleEditSuccess(id?: number) {
    openEdit.value = false;
    updatedEnrollmentId.value = id;

    emit('editComplete', id);
}
</script>

<template>
    <ListTableActions
        v-model:openDelete="openDelete"
        v-model:openEdit="openEdit"
        :pageId="enrollmentId"
        :copy="{
            label: $t('table.action.copy', { name: $t('form.field.enrollment_id.label') }),
            successMessage: $t('toast.copy', { name: $t('form.field.enrollment_id.label') }),
        }"
        :viewDetails="route.name !== 'dashboard-enrollments-id' ? {
            label: $t('table.action.view_details.enrollment'),
            path: `/dashboard/enrollments/${enrollmentId}`,
        } : undefined"
        :edit="{
            label: $t('table.action.edit.enrollment'),
            title: $t('form.enrollment.edit.title'),
            description: $t('form.enrollment.edit.description'),
        }"
        :delete="{
            label: $t('table.action.delete.enrollment'),
            title: $t('form.enrollment.delete.title'),
            description: $t('form.enrollment.delete.description'),
        }"
        :isLoading
        @delete="enrollmentDeleteFormRef?.submit"
        @deleteClose="emit('deleteClose')"
        @edit="enrollmentEditFormRef?.submit"
        @editClose="emit('editClose', updatedEnrollmentId)"
    >
        <template #delete>
            <EnrollmentDeleteForm ref="enrollmentDeleteFormRef" :enrollmentId @success="handleDeleteSuccess" />
        </template>
        <template #edit>
            <EnrollmentEditForm ref="enrollmentEditFormRef" :enrollmentId @success="handleEditSuccess" />
        </template>
    </ListTableActions>
</template>
