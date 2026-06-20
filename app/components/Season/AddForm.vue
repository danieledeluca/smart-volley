<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { InsertedSeason } from '~~/lib/db/schema';

import { InsertSeason } from '~~/lib/db/schema';

const emit = defineEmits<{
    success: [id?: number];
}>();

const seasonsStore = useSeasonsStore();
const { $csrfFetch } = useNuxtApp();
const seasonFormRef = useTemplateRef('seasonFormRef');
const { initialState } = useForm('season');

const state = ref({ ...initialState });
const insertedSeason = ref<InsertedSeason>();

async function onSubmit(event: FormSubmitEvent<InsertSeason>) {
    const season = await $csrfFetch<InsertedSeason>('/api/seasons', {
        method: 'POST',
        body: event.data,
    });

    insertedSeason.value = season;
}

function onSubmitComplete() {
    state.value = { ...initialState };

    seasonsStore.refreshSeasons();

    emit('success', insertedSeason.value?.id);
}

defineExpose({
    submit: () => seasonFormRef.value?.submit(),
    isLoading: () => seasonFormRef.value?.isLoading,
});
</script>

<template>
    <BaseForm
        ref="seasonFormRef"
        v-model:state="state"
        :schema="InsertSeason"
        :onSubmit
        :onSubmitComplete
        :submitButtonLabel="$t('form.button.add')"
        :successMessage="$t('form.season.add.success')"
    >
        <SeasonFields v-model:state="state" />
    </BaseForm>
</template>
