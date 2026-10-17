<script setup lang="ts">
import Actions from '~/components/Details/Actions.vue';

const { seasonId } = defineProps<{
    seasonId: number;
}>();

const emit = defineEmits<{
    editSuccess: [id?: number];
}>();

const seasonEditFormRef = useTemplateRef('seasonEditFormRef');

const openEdit = ref(false);
const updatedSeasonId = ref<number>();

function handleEditSuccess(id?: number) {
    openEdit.value = false;
    updatedSeasonId.value = id;

    emit('editSuccess', id);
}
</script>

<template>
    <Actions
        v-model:openEdit="openEdit"
        :pageId="seasonId"
        :editModal="{
            title: $t('form.season.edit.title'),
            description: $t('form.season.edit.description'),
            isLoading: seasonEditFormRef?.isLoading(),
        }"
        @edit="seasonEditFormRef?.submit"
    >
        <template #edit>
            <SeasonEditForm ref="seasonEditFormRef" :seasonId @success="handleEditSuccess" />
        </template>
    </Actions>
</template>
