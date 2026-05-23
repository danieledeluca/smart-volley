<script setup lang="ts">
import type { FindAthletes } from '~~/lib/db/schema';

const { athlete } = defineProps<{
    athlete: FindAthletes;
}>();

const athletesStore = useAthletesStore();
const { isLoading } = storeToRefs(athletesStore);

const formRef = useTemplateRef('formRef');

const openDelete = ref(false);
const openEdit = ref(false);

async function handleDelete() {
    await athletesStore.removeAthlete(athlete.id);
    openDelete.value = false;
}

async function handleEdit() {
    formRef.value?.submit();
    openEdit.value = false;
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
            <pre>{{ athlete }}</pre>
        </template>
    </ListTableActions>
</template>
