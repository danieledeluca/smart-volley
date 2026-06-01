<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

import { InsertAthlete } from '~~/lib/db/schema';

const { athleteId } = defineProps<{
    athleteId: number;
}>();

const emit = defineEmits<{
    success: [];
}>();

const { data: athlete, pending, error } = useLazyFetch(`/api/athletes/${athleteId}`);

const athletesStore = useAthletesStore();
const { $csrfFetch } = useNuxtApp();
const athleteFormRef = useTemplateRef('athleteFormRef');
const { initialState } = useForm('athlete');

const state = ref({ ...initialState });

async function onSubmit(event: FormSubmitEvent<InsertAthlete>) {
    await $csrfFetch(`/api/athletes/${athleteId}`, {
        method: 'PUT',
        body: event.data,
    });
}

function onSubmitComplete() {
    athletesStore.refreshAthletes();

    emit('success');
}

watchEffect(() => {
    if (athlete.value) {
        state.value = {
            name: athlete.value.name,
            birthdate: athlete.value.birthdate,
            birthplace: athlete.value.birthplace,
            fiscalCode: athlete.value.fiscalCode,
            city: athlete.value.city,
            address: athlete.value.address,
            phoneNumber: athlete.value.phoneNumber ?? undefined,
            email: athlete.value.email ?? undefined,
            parentId: athlete.value.parentId ?? undefined,
        };
    }
});

defineExpose({
    submit: () => athleteFormRef.value?.submit(),
    isLoading: () => athleteFormRef.value?.isLoading,
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
        v-if="athlete"
        ref="athleteFormRef"
        v-model:state="state"
        :schema="InsertAthlete"
        :onSubmit
        :onSubmitComplete
        :submitButtonLabel="$t('form.button.edit')"
        :successMessage="$t('form.athlete.edit.success')"
    >
        <AthleteFields v-model:state="state" />
    </BaseForm>
</template>
