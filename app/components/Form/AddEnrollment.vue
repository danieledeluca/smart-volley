<script setup lang="ts">
import { InsertEnrollment } from '~~/lib/db/schema';

const { showSubmitButton = false } = defineProps<{
    showSubmitButton?: boolean;
}>();

const enrollmentsStore = useEnrollmentsStore();
const athletesStore = useAthletesStore();
const seasonsStore = useSeasonsStore();
const activitiesStore = useActivitiesStore();
const coursesStore = useCoursesStore();

const {
    isAddingEnrollment,
    addingEnrollmentErrors,
    enrollmentAddState,
    enrollmentAddFields,
} = storeToRefs(enrollmentsStore);
const { isAddingAthlete } = storeToRefs(athletesStore);
const { isAddingSeason } = storeToRefs(seasonsStore);
const { isAddingActivity } = storeToRefs(activitiesStore);
const { isAddingCourse } = storeToRefs(coursesStore);

const enrollmentFormRef = useTemplateRef('enrollmentFormRef');
const athleteFormRef = useTemplateRef('athleteFormRef');
const seasonFormRef = useTemplateRef('seasonFormRef');
const activityFormRef = useTemplateRef('activityFormRef');
const courseFormRef = useTemplateRef('courseFormRef');

watch(addingEnrollmentErrors, (newErrors) => {
    enrollmentFormRef.value?.setErrors(newErrors);
});

defineExpose({
    submit: () => enrollmentFormRef.value?.submit(),
});
</script>

<template>
    <UForm
        ref="enrollmentFormRef"
        :schema="InsertEnrollment"
        :state="enrollmentAddState"
        class="grid gap-8"
        @submit="enrollmentsStore.addEnrollment"
    >
        <FormFieldGroup
            v-for="(group, index) in enrollmentAddFields"
            :key="index"
            :title="group.title"
            :icon="group.icon"
        >
            <FormField
                v-for="(field, fieldIndex) in group.fields"
                :key="fieldIndex"
                v-model="enrollmentAddState[field.formFieldProps.name]"
                :field
            >
                <template #athleteId-post>
                    <FormAddModal
                        :title="$t('form.add_athlete.title')"
                        :description="$t('form.add_athlete.description')"
                        :buttonLabel="$t('form.add_athlete.title')"
                        :isLoading="isAddingAthlete"
                        @submit="athleteFormRef?.[0]?.submit"
                    >
                        <FormAddAthlete ref="athleteFormRef" />
                    </FormAddModal>
                </template>
                <template #seasonId-post>
                    <FormAddModal
                        :title="$t('form.add_season.title')"
                        :description="$t('form.add_season.description')"
                        :buttonLabel="$t('form.add_season.title')"
                        :isLoading="isAddingSeason"
                        @submit="seasonFormRef?.[0]?.submit"
                    >
                        <FormAddSeason ref="seasonFormRef" />
                    </FormAddModal>
                </template>
                <template #activityId-post>
                    <FormAddModal
                        :title="$t('form.add_activity.title')"
                        :description="$t('form.add_activity.description')"
                        :buttonLabel="$t('form.add_activity.title')"
                        :isLoading="isAddingActivity"
                        @submit="activityFormRef?.[0]?.submit"
                    >
                        <FormAddActivity ref="activityFormRef" />
                    </FormAddModal>
                </template>
                <template #courseId-post>
                    <FormAddModal
                        :title="$t('form.add_course.title')"
                        :description="$t('form.add_course.description')"
                        :buttonLabel="$t('form.add_course.title')"
                        :isLoading="isAddingCourse"
                        @submit="courseFormRef?.[0]?.submit"
                    >
                        <FormAddCourse ref="courseFormRef" />
                    </FormAddModal>
                </template>
            </FormField>
        </FormFieldGroup>
        <UButton
            type="submit"
            :label="$t('form.button.add')"
            :loading="isAddingEnrollment"
            :class="{ hidden: !showSubmitButton }"
            block
        />
    </UForm>
</template>
