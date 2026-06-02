<script setup lang="ts">
const { parentId } = defineProps<{
    parentId: number;
}>();

const emit = defineEmits<{
    success: [];
}>();

const parentsStore = useParentsStore();
const { $csrfFetch } = useNuxtApp();
const parentFormRef = useTemplateRef('parentFormRef');

async function onSubmit() {
    await $csrfFetch(`/api/parents/${parentId}`, {
        method: 'DELETE',
    });
}

function onSubmitComplete() {
    parentsStore.refreshParents();

    emit('success');
}

defineExpose({
    submit: () => parentFormRef.value?.submit(),
    isLoading: () => parentFormRef.value?.isLoading,
});
</script>

<template>
    <BaseForm
        ref="parentFormRef"
        :onSubmit
        :onSubmitComplete
        :submitButtonLabel="$t('form.button.delete')"
        :successMessage="$t('form.parent.delete.success')"
    >
        <div>{{ $t('form.parent.delete.body') }}</div>
    </BaseForm>
</template>
