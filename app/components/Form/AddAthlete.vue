<script setup lang="ts">
const athletesStore = useAthletesStore();
const { isAddingAthlete, athleteAddState, athleteAddFields } = storeToRefs(athletesStore);

const parentsStore = useParentsStore();
const { showParentAddForm, isAddingParent } = storeToRefs(parentsStore);

const athleteFormRef = useTemplateRef('athleteForm');
const parentFormRef = useTemplateRef('parentForm');

defineExpose({
    submit: () => athleteFormRef.value?.submit(),
});
</script>

<template>
    <UForm
        ref="athleteForm"
        :schema="athleteAddSchema"
        :state="athleteAddState"
        class="grid gap-4 sm:gap-6"
        @submit="athletesStore.addAthlete"
    >
        <ItemCard
            v-for="(group, index) in athleteAddFields"
            :key="index"
            :title="group.title"
            :icon="group.icon"
        >
            <FormField
                v-for="(field, fieldIndex) in group.fields"
                :key="fieldIndex"
                v-model="(athleteAddState[field.name] as FormFieldModelType)"
                :field
                :class="group.fields.length === 1 ? 'col-span-2' : ''"
            >
                <template #parent_id-hint>
                    <UModal v-model:open="showParentAddForm" title="Add new parent">
                        <UButton
                            label="Add new parent"
                            color="primary"
                            variant="link"
                            class="p-0"
                        />
                        <template #body>
                            <FormAddParent ref="parentForm" />
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
        </ItemCard>
        <UButton
            type="submit"
            label="Submit"
            class="hidden"
            :loading="isAddingAthlete"
            block
        />
    </UForm>
</template>
