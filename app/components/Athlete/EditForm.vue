<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { SelectAthlete } from '~~/lib/db/schema';

import { InsertAthlete } from '~~/lib/db/schema';

const { athleteId } = defineProps<{
    athleteId: number;
}>();

const emit = defineEmits<{
    success: [id?: number];
}>();

const { data: athlete, pending, error } = useLazyFetch(`/api/athletes/${athleteId}`);

const { $csrfFetch } = useNuxtApp();
const athletesStore = useAthletesStore();
const athleteFormRef = useTemplateRef('athleteFormRef');
const { initialState } = useForm('athlete');

const state = ref({ ...initialState });
const updatedAthlete = ref<SelectAthlete>();

async function onSubmit(event: FormSubmitEvent<InsertAthlete>) {
    const athlete = await $csrfFetch<SelectAthlete>(`/api/athletes/${athleteId}`, {
        method: 'PUT',
        body: event.data,
    });

    updatedAthlete.value = athlete;
}

function onSubmitSuccess() {
    athletesStore.refreshAthletes();

    emit('success', updatedAthlete.value?.id);
}

watchEffect(() => {
    if (athlete.value) {
        state.value = {
            name: athlete.value.name,
            birthdate: athlete.value.birthdate,
            birthplace: {
                postalCode: athlete.value.birthplacePostalCode ?? undefined,
                city: athlete.value.birthplaceCity ?? undefined,
                province: athlete.value.birthplaceProvince ?? undefined,
                region: athlete.value.birthplaceRegion ?? undefined,
                country: athlete.value.birthplaceCountry,
                formattedAddress: athlete.value.birthplaceFormattedAddress,
                placeId: athlete.value.birthplacePlaceId,
            },
            fiscalCode: athlete.value.fiscalCode,
            address: {
                street: athlete.value.addressStreet,
                postalCode: athlete.value.addressPostalCode,
                city: athlete.value.addressCity,
                province: athlete.value.addressProvince,
                region: athlete.value.addressRegion,
                country: athlete.value.addressCountry,
                formattedAddress: athlete.value.addressFormattedAddress,
                placeId: athlete.value.addressPlaceId,
            },
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
    <AthleteFieldsLoader v-if="pending" />
    <AppError v-else-if="error" :error />
    <BaseForm
        v-else-if="athlete"
        ref="athleteFormRef"
        v-model:state="state"
        :schema="InsertAthlete"
        :onSubmit
        :onSubmitSuccess
        :submitButtonLabel="$t('form.button.edit')"
        :successMessage="$t('form.athlete.edit.success')"
    >
        <AthleteFields v-model:state="state" formAction="edit" />
    </BaseForm>
</template>
