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
        :deleteTitle="$t('form.athlete.delete.title')"
        :deleteDescription="$t('form.athlete.delete.description')"
        :editTitle="$t('form.athlete.edit.title')"
        :editDescription="$t('form.athlete.edit.description')"
        :isLoading
        @delete="handleDelete"
        @edit="handleEdit"
    >
        <template #delete>
            {{ $t('form.athlete.delete.body') }}
        </template>
        <template #edit>
            <!-- TODO: add form -->
            <pre>{{ athleteId }}</pre>
        </template>
    </ListTableActions>
</template>
