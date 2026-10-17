<script setup lang="ts">
import Actions from '~/components/Details/Actions.vue';

const { activityId } = defineProps<{
    activityId: number;
}>();

const emit = defineEmits<{
    editSuccess: [id?: number];
}>();

const activityEditFormRef = useTemplateRef('activityEditFormRef');

const openEdit = ref(false);
const updatedActivityId = ref<number>();

function handleEditSuccess(id?: number) {
    openEdit.value = false;
    updatedActivityId.value = id;

    emit('editSuccess', id);
}
</script>

<template>
    <Actions
        v-model:openEdit="openEdit"
        :pageId="activityId"
        :editModal="{
            title: $t('form.activity.edit.title'),
            description: $t('form.activity.edit.description'),
            isLoading: activityEditFormRef?.isLoading(),
        }"
        @edit="activityEditFormRef?.submit"
    >
        <template #edit>
            <ActivityEditForm ref="activityEditFormRef" :activityId @success="handleEditSuccess" />
        </template>
    </Actions>
</template>
