<script setup lang="ts">
const { seasonId } = defineProps<{
    seasonId: number;
}>();

const emit = defineEmits<{
    editComplete: [id?: number];
    editClose: [id?: number];
}>();

const seasonEditFormRef = useTemplateRef('seasonEditFormRef');

const openEdit = ref(false);
const updatedSeasonId = ref<number>();

const isLoading = computed(() => Boolean(seasonEditFormRef.value?.isLoading()));

function handleEditSuccess(id?: number) {
    openEdit.value = false;
    updatedSeasonId.value = id;

    emit('editComplete', id);
}
</script>

<template>
    <ListTableActions
        v-model:openEdit="openEdit"
        :pageId="seasonId"
        :copy="{
            label: $t('table.action.copy.label', { name: $t('table.action.copy.season_id') }),
            successMessage: $t('toast.copy', { name: $t('table.action.copy.season_id') }),
        }"
        :edit="{
            label: $t('table.action.edit.season'),
            title: $t('form.season.edit.title'),
            description: $t('form.season.edit.description'),
        }"
        :isLoading
        @edit="seasonEditFormRef?.submit"
        @editClose="emit('editClose', updatedSeasonId)"
    >
        <template #edit>
            <SeasonEditForm ref="seasonEditFormRef" :seasonId @success="handleEditSuccess" />
        </template>
    </ListTableActions>
</template>
