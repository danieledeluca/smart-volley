<script setup lang="ts">
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

const isLoading = computed(() => Boolean(activityEditFormRef.value?.isLoading()));

function handleEditSuccess(id?: number) {
    openEdit.value = false;
    updatedActivityId.value = id;

    emit('editComplete', id);
}
</script>

<template>
    <ListTableActions
        v-model:openEdit="openEdit"
        :pageId="activityId"
        :copy="{
            label: $t('table.action.copy.label', { name: $t('table.action.copy.activity_id') }),
            successMessage: $t('toast.copy', { name: $t('table.action.copy.activity_id') }),
        }"
        :edit="{
            label: $t('table.action.edit.activity'),
            title: $t('form.activity.edit.title'),
            description: $t('form.activity.edit.description'),
        }"
        :isLoading
        @edit="activityEditFormRef?.submit"
        @editClose="emit('editClose', updatedActivityId)"
    >
        <template #edit>
            <ActivityEditForm ref="activityEditFormRef" :activityId @success="handleEditSuccess" />
        </template>
    </ListTableActions>
</template>
