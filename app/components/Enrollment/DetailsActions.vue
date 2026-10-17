<script setup lang="ts">
import type { FetchError } from 'ofetch';

import Actions from '~/components/Details/Actions.vue';

const { enrollmentId } = defineProps<{
    enrollmentId: number;
}>();

const emit = defineEmits<{
    deleteSuccess: [];
    editSuccess: [id?: number];
}>();

const route = useRoute();
const toast = useToast();
const { $csrfFetch } = useNuxtApp();
const enrollmentsStore = useEnrollmentsStore();
const enrollmentEditFormRef = useTemplateRef('enrollmentEditFormRef');

const openDelete = ref(false);
const openEdit = ref(false);
const updatedEnrollmentId = ref<number>();
const isDeleting = ref(false);
const isDownloading = ref(false);

async function handleDelete() {
    try {
        isDeleting.value = true;

        await $csrfFetch(`/api/enrollments/${enrollmentId}`, {
            method: 'DELETE',
        });

        toast.add({
            description: $t('form.enrollment.delete.success'),
            color: 'success',
            icon: 'i-lucide-circle-check',
        });

        enrollmentsStore.refreshEnrollments();

        openDelete.value = false;

        emit('deleteSuccess');
    } catch (error) {
        toast.add({
            description: getFetchErrorMessage(error as FetchError),
            color: 'error',
            icon: 'i-lucide-circle-x',
        });
    } finally {
        isDeleting.value = false;
    }
}

async function handleCsvDownload() {
    try {
        isDownloading.value = true;

        await downloadCsv([enrollmentId]);

        toast.add({
            description: $t('form.enrollment.download_csv.success'),
            color: 'success',
            icon: 'i-lucide-circle-check',
        });
    } catch (error) {
        toast.add({
            description: getFetchErrorMessage(error as FetchError),
            color: 'error',
            icon: 'i-lucide-circle-x',
        });
    } finally {
        isDownloading.value = false;
    }
}

function handleEditSuccess(id?: number) {
    openEdit.value = false;
    updatedEnrollmentId.value = id;

    emit('editSuccess', id);
}
</script>

<template>
    <Actions
        v-model:openDelete="openDelete"
        v-model:openEdit="openEdit"
        :pageId="enrollmentId"
        :detailsPath="route.name !== 'dashboard-enrollments-id' ? `/dashboard/enrollments/${enrollmentId}` : undefined"
        :editModal="{
            title: $t('form.enrollment.edit.title'),
            description: $t('form.enrollment.edit.description'),
            isLoading: enrollmentEditFormRef?.isLoading(),
        }"
        :deleteModal="{
            title: $t('form.enrollment.delete.title'),
            description: $t('form.enrollment.delete.description'),
            isLoading: isDeleting,
        }"
        :additionalItems="[
            {
                label: $t('action.download_csv'),
                icon: 'i-lucide-file-spreadsheet',
                onSelect: handleCsvDownload,
            },
        ]"
        @delete="handleDelete"
        @edit="enrollmentEditFormRef?.submit"
    >
        <template #edit>
            <EnrollmentEditForm ref="enrollmentEditFormRef" :enrollmentId @success="handleEditSuccess" />
        </template>
    </Actions>
</template>
