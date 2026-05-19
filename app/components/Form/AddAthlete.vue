<script setup lang="ts">
import { InsertAthlete } from '~~/lib/db/schema';

const { showSubmitButton = false } = defineProps<{
    showSubmitButton?: boolean;
}>();

const athletesStore = useAthletesStore();
const parentsStore = useParentsStore();

const {
    isLoading: isAthletesLoading,
    addingAthleteErrors,
    athleteAddState,
    athleteAddFields,
} = storeToRefs(athletesStore);
const { isLoading: isParentsLoading } = storeToRefs(parentsStore);

const athleteFormRef = useTemplateRef('athleteFormRef');
const parentFormRef = useTemplateRef('parentFormRef');

watch(addingAthleteErrors, (newErrors) => {
    athleteFormRef.value?.setErrors(newErrors);
});

defineExpose({
    submit: () => athleteFormRef.value?.submit(),
});
</script>

<template>
    <UForm
        ref="athleteFormRef"
        :schema="InsertAthlete"
        :state="athleteAddState"
        class="grid gap-8"
        @submit="athletesStore.addAthlete"
    >
        <FormFieldGroup
            v-for="(group, index) in athleteAddFields"
            :key="index"
            :title="group.title"
            :icon="group.icon"
        >
            <FormField
                v-for="(field, fieldIndex) in group.fields"
                :key="fieldIndex"
                v-model="athleteAddState[field.formFieldProps.name]"
                :field
            >
                <template #parentId-post>
                    <FormAddModal
                        :title="$t('form.add_parent.title')"
                        :description="$t('form.add_parent.description')"
                        :buttonLabel="$t('form.add_parent.title')"
                        :isLoading="isParentsLoading"
                        @submit="parentFormRef?.[0]?.submit()"
                    >
                        <FormAddParent ref="parentFormRef" />
                    </FormAddModal>
                </template>
            </FormField>
        </FormFieldGroup>
        <UButton
            type="submit"
            :label="$t('form.button.add')"
            :loading="isAthletesLoading"
            :class="{ hidden: !showSubmitButton }"
            block
        />
    </UForm>
</template>
