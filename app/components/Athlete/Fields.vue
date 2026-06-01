<script setup lang="ts">
import type { InsertAthlete } from '~~/lib/db/schema';

const state = defineModel<Partial<InsertAthlete>>('state', {
    required: true,
});

const { formFields } = useForm('athlete');
const parentFormRef = useTemplateRef('parentFormRef');

const open = ref(false);

function handleSuccess(id?: number) {
    open.value = false;
    state.value.parentId = id;
}
</script>

<template>
    <FormFieldGroup
        v-for="(group, index) in formFields"
        :key="index"
        :title="group.title"
        :icon="group.icon"
    >
        <FormField
            v-for="(field, fieldIndex) in group.fields"
            :key="fieldIndex"
            v-model="state[field.formFieldProps.name]"
            :field
        >
            <template #parentId-post>
                <AppModal
                    v-model:open="open"
                    :title="$t('form.parent.add.title')"
                    :description="$t('form.parent.add.description')"
                    :buttonProps="{
                        label: $t('form.parent.add.title'),
                        icon: 'i-lucide-plus',
                        variant: 'soft',
                        block: true,
                    }"
                    :footerButtonProps="{
                        label: $t('form.button.add'),
                    }"
                    :isLoading="Boolean(parentFormRef?.[0]?.isLoading())"
                    @submit="parentFormRef?.[0]?.submit()"
                >
                    <ParentAddForm ref="parentFormRef" @success="handleSuccess" />
                </AppModal>
            </template>
        </FormField>
    </FormFieldGroup>
</template>
