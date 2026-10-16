<script setup lang="ts">
import type { SelectParentsSerialized } from '~~/lib/db/schema';

const { parents } = defineProps<{
    parents: SelectParentsSerialized[];
}>();

const emit = defineEmits<{
    success: [];
}>();

const parentsStore = useParentsStore();
const { $csrfFetch } = useNuxtApp();
const parentFormRef = useTemplateRef('parentFormRef');

async function onSubmit() {
    await $csrfFetch(`/api/parents`, {
        method: 'DELETE',
        body: {
            ids: parents.map((parent) => parent.id),
        },
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
        :successMessage="$t('form.parent.multiple_delete.success')"
    />
</template>
