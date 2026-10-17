<script setup lang="ts">
import type { FetchError } from 'ofetch';

import Actions from '~/components/Details/Actions.vue';

const { athleteId } = defineProps<{
    athleteId: number;
}>();

const emit = defineEmits<{
    deleteSuccess: [];
    editSuccess: [id?: number];
}>();

const route = useRoute();
const toast = useToast();
const { $csrfFetch } = useNuxtApp();
const athletesStore = useAthletesStore();
const enrollmentsStore = useEnrollmentsStore();
const athleteEditFormRef = useTemplateRef('athleteEditFormRef');

const openDelete = ref(false);
const openEdit = ref(false);
const isDeleting = ref(false);
const updatedAthleteId = ref<number>();

async function handleDelete() {
    try {
        isDeleting.value = true;

        await $csrfFetch(`/api/athletes/${athleteId}`, {
            method: 'DELETE',
        });

        toast.add({
            description: $t('form.athlete.delete.success'),
            color: 'success',
            icon: 'i-lucide-circle-check',
        });

        athletesStore.refreshAthletes();
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

function handleEditSuccess(id?: number) {
    openEdit.value = false;
    updatedAthleteId.value = id;

    emit('editSuccess', id);
}
</script>

<template>
    <Actions
        v-model:openDelete="openDelete"
        v-model:openEdit="openEdit"
        :pageId="athleteId"
        :detailsPath="route.name !== 'dashboard-athletes-id' ? `/dashboard/athletes/${athleteId}` : undefined"
        :editModal="{
            title: $t('form.athlete.edit.title'),
            description: $t('form.athlete.edit.description'),
            isLoading: athleteEditFormRef?.isLoading(),
        }"
        :deleteModal="{
            title: $t('form.athlete.delete.title'),
            description: $t('form.athlete.delete.description'),
            isLoading: isDeleting,
        }"
        @delete="handleDelete"
        @edit="athleteEditFormRef?.submit"
        @interactOutside="preventClose"
    >
        <template #edit>
            <AthleteEditForm ref="athleteEditFormRef" :athleteId @success="handleEditSuccess" />
        </template>
    </Actions>
</template>
