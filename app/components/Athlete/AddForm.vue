<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { SelectAthlete } from '~~/lib/db/schema';

import { InsertAthlete } from '~~/lib/db/schema';

const emit = defineEmits<{
    success: [id?: number];
}>();

const { $csrfFetch } = useNuxtApp();
const athletesStore = useAthletesStore();
const athleteFormRef = useTemplateRef('athleteFormRef');
const { initialState } = useForm('athlete');

const state = ref({ ...initialState });
const insertedAthlete = ref<SelectAthlete>();

async function onSubmit(event: FormSubmitEvent<InsertAthlete>) {
    const athlete = await $csrfFetch<SelectAthlete>('/api/athletes', {
        method: 'POST',
        body: event.data,
    });

    insertedAthlete.value = athlete;
}

function onSubmitSuccess() {
    state.value = { ...initialState };

    athletesStore.refreshAthletes();

    emit('success', insertedAthlete.value?.id);
}

defineExpose({
    submit: () => athleteFormRef.value?.submit(),
    isLoading: () => athleteFormRef.value?.isLoading,
});
</script>

<template>
    <BaseForm
        ref="athleteFormRef"
        v-model:state="state"
        :schema="InsertAthlete"
        :onSubmit
        :onSubmitSuccess
        :submitButtonLabel="$t('form.button.add')"
        :successMessage="$t('form.athlete.add.success')"
    >
        <AthleteFields v-model:state="state" formAction="add" />
    </BaseForm>
</template>
