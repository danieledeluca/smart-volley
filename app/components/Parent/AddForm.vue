<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { SelectParent } from '~~/lib/db/schema';

import { InsertParent } from '~~/lib/db/schema';

const emit = defineEmits<{
    success: [id?: number];
}>();

const { $csrfFetch } = useNuxtApp();
const parentsStore = useParentsStore();
const parentFormRef = useTemplateRef('parentFormRef');
const { initialState } = useForm('parent');

const state = ref({ ...initialState });
const insertedParent = ref<SelectParent>();

async function onSubmit(event: FormSubmitEvent<InsertParent>) {
    const parent = await $csrfFetch<SelectParent>('/api/parents', {
        method: 'POST',
        body: event.data,
    });

    insertedParent.value = parent;
}

function onSubmitSuccess() {
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
        :onSubmitSuccess
        :submitButtonLabel="$t('form.button.add')"
        :successMessage="$t('form.parent.add.success')"
    >
        <ParentFields v-model:state="state" formAction="add" />
    </BaseForm>
</template>
