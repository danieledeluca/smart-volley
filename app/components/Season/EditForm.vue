<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { UpdatedSeason } from '~~/lib/db/schema';

import { InsertSeason } from '~~/lib/db/schema';

const { seasonId } = defineProps<{
    seasonId: number;
}>();

const emit = defineEmits<{
    success: [id?: number];
}>();

const { data: season, pending, error } = useLazyFetch(`/api/seasons/${seasonId}`);

const seasonsStore = useSeasonsStore();
const { $csrfFetch } = useNuxtApp();
const seasonFormRef = useTemplateRef('seasonFormRef');
const { initialState } = useForm('season');

const state = ref({ ...initialState });
const updatedSeason = ref<UpdatedSeason>();

async function onSubmit(event: FormSubmitEvent<InsertSeason>) {
    const season = await $csrfFetch<UpdatedSeason>(`/api/seasons/${seasonId}`, {
        method: 'PUT',
        body: event.data,
    });

    updatedSeason.value = season;
}

function onSubmitComplete() {
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
    <SeasonEditFormLoader v-if="pending" />
    <UAlert
        v-else-if="error"
        :title="error.statusMessage"
        color="error"
        icon="i-lucide-circle-x"
    />
    <BaseForm
        v-else-if="season"
        ref="seasonFormRef"
        v-model:state="state"
        :schema="InsertSeason"
        :onSubmit
        :onSubmitComplete
        :submitButtonLabel="$t('form.button.edit')"
        :successMessage="$t('form.season.edit.success')"
    >
        <SeasonFields v-model:state="state" />
    </BaseForm>
</template>
