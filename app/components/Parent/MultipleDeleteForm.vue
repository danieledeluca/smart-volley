<script setup lang="ts">
import type { SelectParents } from '~~/lib/db/schema';

const { parents } = defineProps<{
    parents: SelectParents[];
}>();

const emit = defineEmits<{
    success: [];
}>();

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
    >
        <div>{{ $t('form.parent.multiple_delete.body') }}</div>
        <UCollapsible>
            <UButton
                variant="outline"
                color="neutral"
                :label="$t('form.parent.multiple_delete.button.show_selected')"
                trailingIcon="i-lucide-chevron-down"
                block
            />

            <template #content>
                <div class="mt-4 flex flex-col gap-4">
                    <AppUser
                        v-for="parent in parents"
                        :key="parent.id"
                        :userProps="{
                            name: parent.name,
                            description: parent.fiscalCode,
                        }"
                    />
                </div>
            </template>
        </UCollapsible>
    </BaseForm>
</template>
