<script setup lang="ts">
import type { FindEnrollments } from '~~/lib/db/schema';

const { enrollment } = defineProps<{
    enrollment: FindEnrollments;
}>();

const enrollmentsStore = useEnrollmentsStore();
const { isLoading } = storeToRefs(enrollmentsStore);

const formRef = useTemplateRef('formRef');

const openDelete = ref(false);
const openEdit = ref(false);

async function handleDelete() {
    await enrollmentsStore.removeEnrollment(enrollment.id);
    openDelete.value = false;
}

async function handleEdit() {
    formRef.value?.submit();
    openEdit.value = false;

    console.log(enrollment);
}
</script>

<template>
    <ListTableActions
        v-model:openDelete="openDelete"
        v-model:openEdit="openEdit"
        :deleteTitle="$t('form.delete_enrollment.title')"
        :deleteDescription="$t('form.delete_enrollment.description')"
        :editTitle="$t('form.edit_enrollment.title')"
        :editDescription="$t('form.edit_enrollment.description')"
        :isLoading
        @delete="handleDelete"
        @edit="handleEdit"
    >
        <template #delete>
            {{ $t('form.delete_enrollment.body') }}
        </template>
        <template #edit>
            <!-- TODO: add form -->
            <pre>{{ enrollment }}</pre>
        </template>
    </ListTableActions>
</template>
