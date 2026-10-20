<script setup lang="ts">
import type { Row } from '@tanstack/vue-table';
import type { SelectAthlete } from '~~/lib/db/schema';
import type { FetchError } from 'ofetch';

import Actions from '~/components/List/Actions.vue';

const { selectedRows, isLoading } = defineProps<{
    selectedRows?: Row<SelectAthlete>[];
    isLoading: boolean;
}>();

const emit = defineEmits<{
    deleteSuccess: [];
}>();

const toast = useToast();
const { $csrfFetch } = useNuxtApp();
const athletesStore = useAthletesStore();
const enrollmentsStore = useEnrollmentsStore();
const dashboardStore = useDashboardStore();

const openDelete = ref(false);
const isDeleting = ref(false);

const selectedRowsQuantity = computed(() => selectedRows?.length || 0);

async function handleDelete() {
    try {
        isDeleting.value = true;

        await $csrfFetch('/api/athletes', {
            method: 'DELETE',
            body: {
                ids: selectedRows?.map((row) => row.original.id),
            },
        });

        toast.add({
            description: $t('form.athlete.multiple_delete.success'),
            color: 'success',
            icon: 'i-lucide-circle-check',
        });

        athletesStore.refreshAthletes();
        enrollmentsStore.refreshEnrollments();
        dashboardStore.refreshStats();

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
</script>

<template>
    <Actions
        v-model:openDelete="openDelete"
        :deleteModal="{
            title: $t('form.athlete.multiple_delete.title', {
                quantity: selectedRowsQuantity.toString(),
            }),
            description: $t('form.athlete.multiple_delete.description'),
            isDisabled: selectedRowsQuantity === 0,
            isLoading: isLoading || isDeleting,
        }"
        @delete="handleDelete"
    />
</template>
