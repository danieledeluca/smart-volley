<script setup lang="ts">
import DetailsActions from '~/components/Details/Actions.vue';

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
    <DetailsActions
        v-model:openDelete="openDelete"
        v-model:openEdit="openEdit"
        :pageId="enrollmentId"
        :detailsPath="route.name !== 'dashboard-enrollments-id' ? `/dashboard/enrollments/${enrollmentId}` : undefined"
        :editModal="{
            title: $t('form.enrollment.edit.title'),
            description: $t('form.enrollment.edit.description'),
            isLoading: Boolean(enrollmentEditFormRef?.isLoading()),
        }"
        :deleteModal="{
            title: $t('form.enrollment.delete.title'),
            description: $t('form.enrollment.delete.description'),
            isLoading: Boolean(enrollmentDeleteFormRef?.isLoading()),
        }"
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
    </DetailsActions>
</template>
