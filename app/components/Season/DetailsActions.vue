<script setup lang="ts">
import DetailsActions from '~/components/Details/Actions.vue';

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

function handleEditSuccess(id?: number) {
    openEdit.value = false;
    updatedSeasonId.value = id;

    emit('editComplete', id);
}
</script>

<template>
    <DetailsActions
        v-model:openEdit="openEdit"
        :pageId="seasonId"
        :editModal="{
            title: $t('form.season.edit.title'),
            description: $t('form.season.edit.description'),
            isLoading: Boolean(seasonEditFormRef?.isLoading()),
        }"
        @edit="seasonEditFormRef?.submit"
        @editClose="emit('editClose', updatedSeasonId)"
    >
        <template #edit>
            <SeasonEditForm ref="seasonEditFormRef" :seasonId @success="handleEditSuccess" />
        </template>
    </DetailsActions>
</template>
