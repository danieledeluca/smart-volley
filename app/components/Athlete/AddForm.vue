<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { InsertedAthlete } from '~~/lib/db/schema';

import { InsertAthlete } from '~~/lib/db/schema';

const emit = defineEmits<{
    success: [id?: number];
}>();

const athletesStore = useAthletesStore();
const { $csrfFetch } = useNuxtApp();
const athleteFormRef = useTemplateRef('athleteFormRef');
const { initialState } = useForm('athlete');

const insertedAthlete = ref<InsertedAthlete | null>(null);
const state = ref({ ...initialState });

async function onSubmit(event: FormSubmitEvent<InsertAthlete>) {
    const athlete = await $csrfFetch('/api/athletes', {
        method: 'POST',
        body: event.data,
    });

    insertedAthlete.value = athlete;
}

function onSubmitComplete() {
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
        :onSubmitComplete
        :submitButtonLabel="$t('form.button.add')"
        :successMessage="$t('form.athlete.add.success')"
    >
        <AthleteFields v-model:state="state" />
    </BaseForm>
</template>
