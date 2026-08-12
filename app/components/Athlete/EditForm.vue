<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { UpdatedAthlete } from '~~/lib/db/schema';

import { InsertAthlete } from '~~/lib/db/schema';

const { athleteId } = defineProps<{
    athleteId: number;
}>();

const emit = defineEmits<{
    success: [id?: number];
}>();

const { data: athlete, pending, error } = useLazyFetch(`/api/athletes/${athleteId}`);

const athletesStore = useAthletesStore();
const { $csrfFetch } = useNuxtApp();
const athleteFormRef = useTemplateRef('athleteFormRef');
const { initialState } = useForm('athlete');

const state = ref({ ...initialState });
const updatedAthlete = ref<UpdatedAthlete>();

async function onSubmit(event: FormSubmitEvent<InsertAthlete>) {
    const athlete = await $csrfFetch<UpdatedAthlete>(`/api/athletes/${athleteId}`, {
        method: 'PUT',
        body: event.data,
    });

    updatedAthlete.value = athlete;
}

function onSubmitComplete() {
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
