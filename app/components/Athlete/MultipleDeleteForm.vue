<script setup lang="ts">
import type { SelectAthletes } from '~~/lib/db/schema';

const { athletes } = defineProps<{
    athletes: SelectAthletes[];
}>();

const emit = defineEmits<{
    success: [];
}>();

const athletesStore = useAthletesStore();
const enrollmentsStore = useEnrollmentsStore();
const { $csrfFetch } = useNuxtApp();
const athleteFormRef = useTemplateRef('athleteFormRef');

async function onSubmit() {
    await $csrfFetch(`/api/athletes`, {
        method: 'DELETE',
        body: {
            ids: athletes.map((athlete) => athlete.id),
        },
    });
}

function onSubmitComplete() {
    athletesStore.refreshAthletes();
    enrollmentsStore.refreshEnrollments();

    emit('success');
}

defineExpose({
    submit: () => athleteFormRef.value?.submit(),
    isLoading: () => athleteFormRef.value?.isLoading,
});
</script>

<template>
    <BaseForm
        ref="athleteFormRef"
        :onSubmit
        :onSubmitComplete
        :submitButtonLabel="$t('form.button.delete')"
        :successMessage="$t('form.athlete.multiple_delete.success')"
    >
        <div>{{ $t('form.athlete.multiple_delete.body') }}</div>
        <UCollapsible>
            <UButton
                variant="outline"
                color="neutral"
                :label="$t('form.athlete.multiple_delete.button.show_selected')"
                trailingIcon="i-lucide-chevron-down"
                block
            />

            <template #content>
                <div class="mt-4 flex flex-col gap-4">
                    <AppUser
                        v-for="athlete in athletes"
                        :key="athlete.id"
                        :userProps="{
                            name: athlete.name,
                            description: athlete.fiscalCode,
                        }"
                    />
                </div>
            </template>
        </UCollapsible>
    </BaseForm>
</template>
