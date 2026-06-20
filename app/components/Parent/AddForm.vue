<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { InsertedParent } from '~~/lib/db/schema';

import { InsertParent } from '~~/lib/db/schema';

const emit = defineEmits<{
    success: [id?: number];
}>();

const parentsStore = useParentsStore();
const { $csrfFetch } = useNuxtApp();
const parentFormRef = useTemplateRef('parentFormRef');
const { initialState } = useForm('parent');

const state = ref({ ...initialState });
const insertedParent = ref<InsertedParent>();

async function onSubmit(event: FormSubmitEvent<InsertParent>) {
    const parent = await $csrfFetch<InsertedParent>('/api/parents', {
        method: 'POST',
        body: event.data,
    });

    insertedParent.value = parent;
}

function onSubmitComplete() {
    state.value = { ...initialState };

    parentsStore.refreshParents();

    emit('success', insertedParent.value?.id);
}

defineExpose({
    submit: () => parentFormRef.value?.submit(),
    isLoading: () => parentFormRef.value?.isLoading,
});
</script>

<template>
    <BaseForm
        ref="parentFormRef"
        v-model:state="state"
        :schema="InsertParent"
        :onSubmit
        :onSubmitComplete
        :submitButtonLabel="$t('form.button.add')"
        :successMessage="$t('form.parent.add.success')"
    >
        <ParentFields v-model:state="state" />
    </BaseForm>
</template>
