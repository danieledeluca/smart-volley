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
        class="grid gap-8"
        @submit="athletesStore.addAthlete"
    >
        <div v-for="(group, index) in athleteAddFields" :key="index">
            <div class="mb-4 flex items-center gap-2 border-b border-b-accented pb-2 text-xl">
                <UIcon :name="group.icon" class="text-primary" />
                <div>{{ group.title }}</div>
            </div>
            <div class="space-y-4">
                <FormField
                    v-for="(field, fieldIndex) in group.fields"
                    :key="fieldIndex"
                    v-model="(athleteAddState[field.name] as FormFieldModelType)"
                    :field
                    :class="group.fields.length === 1 ? 'col-span-2' : ''"
                >
                    <template #parent_id-hint>
                        <UModal v-model:open="showParentAddForm" :title="$t('form.add_parent.title')">
                            <UButton :label="$t('form.add_athlete.button.add_parent')" variant="link" class="p-0" />
                            <template #body>
                                <FormAddParent ref="parentForm" />
                            </template>
                            <template #footer>
                                <UButton
                                    type="button"
                                    :label="$t('form.button.add')"
                                    :loading="isAddingParent"
                                    icon="i-lucide-plus"
                                    block
                                    @click="parentFormRef?.[0]?.submit()"
                                />
                            </template>
                        </UModal>
                    </template>
                </FormField>
            </div>
        </div>
        <UButton
            type="submit"
            :label="$t('form.button.add')"
            class="hidden"
            :loading="isAddingAthlete"
            block
        />
    </UForm>
</template>
