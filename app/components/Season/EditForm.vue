<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { SelectSeason } from '~~/lib/db/schema';

import { InsertSeason } from '~~/lib/db/schema';

const { seasonId } = defineProps<{
    seasonId: number;
}>();

const emit = defineEmits<{
    success: [id?: number];
}>();

const { data: season, pending, error } = useLazyFetch(`/api/seasons/${seasonId}`);

const { $csrfFetch } = useNuxtApp();
const seasonsStore = useSeasonsStore();
const seasonFormRef = useTemplateRef('seasonFormRef');
const { initialState } = useForm('season');

const state = ref({ ...initialState });
const updatedSeason = ref<SelectSeason>();

async function onSubmit(event: FormSubmitEvent<InsertSeason>) {
    const season = await $csrfFetch<SelectSeason>(`/api/seasons/${seasonId}`, {
        method: 'PUT',
        body: event.data,
    });

    updatedSeason.value = season;
}

function onSubmitSuccess() {
    seasonsStore.refreshSeasons();

    emit('success', updatedSeason.value?.id);
}

watchEffect(() => {
    if (season.value) {
        state.value = {
            startYear: season.value.startYear,
            endYear: season.value.endYear,
        };
    }
});

defineExpose({
    submit: () => seasonFormRef.value?.submit(),
    isLoading: () => seasonFormRef.value?.isLoading,
});
</script>

<template>
    <SeasonFieldsLoader v-if="pending" />
    <AppError v-else-if="error" :error />
    <BaseForm
        v-else-if="season"
        ref="seasonFormRef"
        v-model:state="state"
        :schema="InsertSeason"
        :onSubmit
        :onSubmitSuccess
        :submitButtonLabel="$t('form.button.edit')"
        :successMessage="$t('form.season.edit.success')"
    >
        <SeasonFields v-model:state="state" formAction="edit" />
    </BaseForm>
</template>
