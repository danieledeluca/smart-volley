<script setup lang="ts">
import DetailsActions from '~/components/Details/Actions.vue';

const { activityId } = defineProps<{
    activityId: number;
}>();

const emit = defineEmits<{
    editComplete: [id?: number];
    editClose: [id?: number];
}>();

const activityEditFormRef = useTemplateRef('activityEditFormRef');

const openEdit = ref(false);
const updatedActivityId = ref<number>();

function handleEditSuccess(id?: number) {
    openEdit.value = false;
    updatedActivityId.value = id;

    emit('editComplete', id);
}
</script>

<template>
    <DetailsActions
        v-model:openEdit="openEdit"
        :pageId="activityId"
        :editModal="{
            title: $t('form.activity.edit.title'),
            description: $t('form.activity.edit.description'),
            isLoading: Boolean(activityEditFormRef?.isLoading()),
        }"
        @edit="activityEditFormRef?.submit"
        @editClose="emit('editClose', updatedActivityId)"
    >
        <template #edit>
            <ActivityEditForm ref="activityEditFormRef" :activityId @success="handleEditSuccess" />
        </template>
    </DetailsActions>
</template>
