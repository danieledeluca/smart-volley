<script setup lang="ts">
import { InsertAthlete } from '~~/lib/db/schema';

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
                    <AppModal
                        :title="$t('form.add_parent.title')"
                        :description="$t('form.add_parent.description')"
                        :buttonProps="{
                            label: $t('form.add_parent.title'),
                            icon: 'i-lucide-plus',
                            variant: 'soft',
                            block: true,
                        }"
                        :footerButtonProps="{
                            label: $t('form.button.add'),
                        }"
                        :isLoading="isParentsLoading"
                        @submit="parentFormRef?.[0]?.submit()"
                    >
                        <ParentForm ref="parentFormRef" />
                    </AppModal>
                </template>
            </FormField>
        </FormFieldGroup>
        <UButton
            type="submit"
            :label="$t('form.button.add')"
            :loading="isAthletesLoading"
            class="hidden"
            block
        />
    </UForm>
</template>
