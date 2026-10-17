<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { SelectParent } from '~~/lib/db/schema';

import { InsertParent } from '~~/lib/db/schema';

const { parentId } = defineProps<{
    parentId: number;
}>();

const emit = defineEmits<{
    success: [id?: number];
}>();

const { data: parent, pending, error } = useLazyFetch(`/api/parents/${parentId}`);

const { $csrfFetch } = useNuxtApp();
const parentsStore = useParentsStore();
const parentFormRef = useTemplateRef('parentFormRef');
const { initialState } = useForm('parent');

const state = ref({ ...initialState });
const updatedParent = ref<SelectParent>();

async function onSubmit(event: FormSubmitEvent<InsertParent>) {
    const parent = await $csrfFetch<SelectParent>(`/api/parents/${parentId}`, {
        method: 'PUT',
        body: event.data,
    });

    updatedParent.value = parent;
}

function onSubmitSuccess() {
    parentsStore.refreshParents();

    emit('success', updatedParent.value?.id);
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
    <ParentFieldsLoader v-if="pending" />
    <AppError v-else-if="error" :error />
    <BaseForm
        v-else-if="parent"
        ref="parentFormRef"
        v-model:state="state"
        :schema="InsertParent"
        :onSubmit
        :onSubmitSuccess
        :submitButtonLabel="$t('form.button.edit')"
        :successMessage="$t('form.parent.edit.success')"
    >
        <ParentFields v-model:state="state" formAction="edit" />
    </BaseForm>
</template>
