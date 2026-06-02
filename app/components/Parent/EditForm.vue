<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

import { InsertParent } from '~~/lib/db/schema';

const { parentId } = defineProps<{
    parentId: number;
}>();

const emit = defineEmits<{
    success: [];
}>();

const { data: parent, pending, error } = useLazyFetch(`/api/parents/${parentId}`);

const parentsStore = useParentsStore();
const { $csrfFetch } = useNuxtApp();
const parentFormRef = useTemplateRef('parentFormRef');
const { initialState } = useForm('parent');

const state = ref({ ...initialState });

async function onSubmit(event: FormSubmitEvent<InsertParent>) {
    await $csrfFetch(`/api/parents/${parentId}`, {
        method: 'PUT',
        body: event.data,
    });
}

function onSubmitComplete() {
    parentsStore.refreshParents();

    emit('success');
}

watchEffect(() => {
    if (parent.value) {
        state.value = {
            name: parent.value.name,
            fiscalCode: parent.value.fiscalCode,
            phoneNumber: parent.value.phoneNumber ?? undefined,
            email: parent.value.email ?? undefined,
        };
    }
});

defineExpose({
    submit: () => parentFormRef.value?.submit(),
    isLoading: () => parentFormRef.value?.isLoading,
});
</script>

<template>
    <USkeleton v-if="pending" class="h-full" />
    <UAlert
        v-else-if="error"
        :title="error.statusMessage"
        color="error"
        icon="i-lucide-circle-x"
    />
    <BaseForm
        v-if="parent"
        ref="parentFormRef"
        v-model:state="state"
        :schema="InsertParent"
        :onSubmit
        :onSubmitComplete
        :submitButtonLabel="$t('form.button.edit')"
        :successMessage="$t('form.parent.edit.success')"
    >
        <ParentFields v-model:state="state" />
    </BaseForm>
</template>
