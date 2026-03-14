<script setup lang="ts">
const athletesStore = useAthletesStore();
const parentsStore = useParentsStore();

const { isAddingAthlete, athleteAddState, athleteAddFields } = storeToRefs(athletesStore);
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
        class="grid gap-8"
        @submit="athletesStore.addAthlete"
    >
        <FormFieldGroup v-for="(group, index) in athleteAddFields" :key="index" :group>
            <FormField
                v-for="(field, fieldIndex) in group.fields"
                :key="fieldIndex"
                v-model="(athleteAddState[field.name] as FormFieldModelType)"
                :field
            >
                <template #parent_id-post>
                    <FormModalAdd
                        v-model:open="showParentAddForm"
                        v-model:adding="isAddingParent"
                        :title="$t('form.add_parent.title')"
                        :description="$t('form.add_parent.description')"
                        :buttonLabel="$t('form.add_athlete.button.add_parent')"
                        :formRef="parentFormRef"
                    >
                        <FormAddParent ref="parentForm" />
                    </FormModalAdd>
                </template>
            </FormField>
        </FormFieldGroup>
        <UButton
            type="submit"
            :label="$t('form.button.add')"
            class="hidden"
            :loading="isAddingAthlete"
            block
        />
    </UForm>
</template>
