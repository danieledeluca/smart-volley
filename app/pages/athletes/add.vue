<script setup lang="ts">
const athletesStore = useAthletesStore();
const { isAddingAthlete, athleteAddFields } = storeToRefs(athletesStore);

const formRef = useTemplateRef('form');

const state = reactive<Partial<AddAthleteSchema>>({
    name: undefined,
    birthday: undefined,
    birthplace: undefined,
    tax_code: undefined,
    city: undefined,
    address: undefined,
    phone_number: undefined,
    email: undefined,
    parent_id: undefined,
});
</script>

<template>
    <UPageHeader title="New athletes" />
    <UCard class="lg:max-w-lg" variant="subtle">
        <UForm
            ref="form"
            :schema="addAthleteSchema"
            :state
            class="grid gap-4"
            @submit="athletesStore.addAthlete"
        >
            <FormField
                v-for="(field, index) in athleteAddFields"
                :key="index"
                v-model="state[field.name] as FormFieldModelType"
                :field
            />
            <UButton
                type="submit"
                label="Submit"
                :loading="isAddingAthlete"
                class="hidden"
                block
            />
        </UForm>
        <template #footer>
            <UButton
                type="button"
                label="Submit"
                :loading="isAddingAthlete"
                block
                @click="formRef?.submit()"
            />
        </template>
    </UCard>
</template>
