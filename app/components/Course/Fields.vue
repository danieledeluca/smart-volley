<script setup lang="ts">
import type { InsertCourse } from '~~/lib/db/schema';

const state = defineModel<Partial<InsertCourse>>('state', {
    required: true,
});

const authStore = useAuthStore();
const { formFields } = useForm('course');
const activityFormRef = useTemplateRef('activityFormRef');

const { isAdmin } = storeToRefs(authStore);

const openActivityModal = ref(false);

function handleSuccess(id?: number) {
    openActivityModal.value = false;
    state.value.activityId = id;
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
            <template v-if="isAdmin" #activityId-post>
                <AppModal
                    v-model:open="openActivityModal"
                    :title="$t('form.activity.add.title')"
                    :description="$t('form.activity.add.description')"
                    :buttonProps="{
                        label: $t('form.activity.add.title'),
                        icon: 'i-lucide-plus',
                        variant: 'soft',
                        block: true,
                    }"
                    :submitButtonProps="{
                        label: $t('form.button.add'),
                        loading: activityFormRef?.[0]?.isLoading(),
                    }"
                    @submit="activityFormRef?.[0]?.submit"
                >
                    <ActivityAddForm ref="activityFormRef" @success="handleSuccess" />
                </AppModal>
            </template>
        </FormField>
    </FormFieldGroup>
</template>
