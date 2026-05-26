<script setup lang="ts">
const { athleteId, onDeleteComplete, onEditComplete } = defineProps<{
    athleteId: number;
    onDeleteComplete?: () => void;
    onEditComplete?: () => void;
}>();

const athletesStore = useAthletesStore();
const { isLoading } = storeToRefs(athletesStore);

const openDelete = ref(false);
const openEdit = ref(false);

async function handleDelete() {
    await athletesStore.removeAthlete(athleteId, onDeleteComplete);
    openDelete.value = false;
}

async function handleEdit() {
    // TODO: add function in store
    openEdit.value = false;

    onEditComplete?.();
}
</script>

<template>
    <ListTableActions
        v-model:openDelete="openDelete"
        v-model:openEdit="openEdit"
        :deleteTitle="$t('form.delete_athlete.title')"
        :deleteDescription="$t('form.delete_athlete.description')"
        :editTitle="$t('form.edit_athlete.title')"
        :editDescription="$t('form.edit_athlete.description')"
        :isLoading
        @delete="handleDelete"
        @edit="handleEdit"
    >
        <template #delete>
            {{ $t('form.delete_athlete.body') }}
        </template>
        <template #edit>
            <!-- TODO: add form -->
            <pre>{{ athleteId }}</pre>
        </template>
    </ListTableActions>
</template>
