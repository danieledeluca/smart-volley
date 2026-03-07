<script setup lang="ts">
const athletesStore = useAthletesStore();
const { isAddingAthlete, athleteAddFields } = storeToRefs(athletesStore);

const parentsStore = useParentsStore();
const { isAddingParent } = storeToRefs(parentsStore);

const formRef = useTemplateRef('form');
const parentFormRef = useTemplateRef('parentForm');

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
    <UPageHeader title="Add new athletes" />
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
                v-model="(state[field.name] as FormFieldModelType)"
                :field
            >
                <template #parent_id-hint>
                    <UModal title="Add new parent" :ui="{ footer: 'justify-end' }">
                        <UButton
                            label="Add new parent"
                            color="primary"
                            variant="link"
                            class="p-0"
                        />
                        <template #body>
                            <ParentAddForm ref="parentForm" />
                        </template>
                        <template #footer>
                            <UButton
                                type="button"
                                label="Submit"
                                :loading="isAddingParent"
                                block
                                @click="parentFormRef?.[0]?.submit()"
                            />
                        </template>
                    </UModal>
                </template>
            </FormField>
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
