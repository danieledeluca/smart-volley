<script setup lang="ts">
const enrollmentsStore = useEnrollmentsStore();
const athletesStore = useAthletesStore();
const seasonsStore = useSeasonsStore();
const activitiesStore = useActivitiesStore();
const coursesStore = useCoursesStore();

const { isAddingEnrollment, enrollmentAddState, enrollmentAddFields } = storeToRefs(enrollmentsStore);
const { showAthleteAddForm, isAddingAthlete } = storeToRefs(athletesStore);
const { showSeasonAddForm, isAddingSeason } = storeToRefs(seasonsStore);
const { showActivityAddForm, isAddingActivity } = storeToRefs(activitiesStore);
const { showCourseAddForm, isAddingCourse } = storeToRefs(coursesStore);

const enrollmentFormRef = useTemplateRef('enrollmentForm');
const athleteFormRef = useTemplateRef('athleteForm');
const seasonFormRef = useTemplateRef('seasonForm');
const activityFormRef = useTemplateRef('activityForm');
const courseFormRef = useTemplateRef('courseForm');

defineExpose({
    submit: () => enrollmentFormRef.value?.submit(),
});
</script>

<template>
    <UForm
        ref="enrollmentForm"
        :schema="enrollmentAddSchema"
        :state="enrollmentAddState"
        class="grid gap-8"
        @submit="enrollmentsStore.addEnrollment"
    >
        <FormFieldGroup v-for="(group, index) in enrollmentAddFields" :key="index" :group>
            <FormField
                v-for="(field, fieldIndex) in group.fields"
                :key="fieldIndex"
                v-model="(enrollmentAddState[field.name] as FormFieldModelType)"
                :field
            >
                <template #athlete_id-post>
                    <FormModalAdd
                        v-model:open="showAthleteAddForm"
                        v-model:adding="isAddingAthlete"
                        :title="$t('form.add_athlete.title')"
                        :description="$t('form.add_athlete.description')"
                        :buttonLabel="$t('form.add_enrollment.button.add_athlete')"
                        :formRef="athleteFormRef"
                    >
                        <FormAddAthlete ref="athleteForm" />
                    </FormModalAdd>
                </template>
                <template #season_id-post>
                    <FormModalAdd
                        v-model:open="showSeasonAddForm"
                        v-model:adding="isAddingSeason"
                        :title="$t('form.add_season.title')"
                        :description="$t('form.add_season.description')"
                        :buttonLabel="$t('form.add_enrollment.button.add_season')"
                        :formRef="seasonFormRef"
                    >
                        <FormAddSeason ref="seasonForm" />
                    </FormModalAdd>
                </template>
                <template #activity_id-post>
                    <FormModalAdd
                        v-model:open="showActivityAddForm"
                        v-model:adding="isAddingActivity"
                        :title="$t('form.add_activity.title')"
                        :description="$t('form.add_activity.description')"
                        :buttonLabel="$t('form.add_enrollment.button.add_activity')"
                        :formRef="activityFormRef"
                    >
                        <FormAddActivity ref="activityForm" />
                    </FormModalAdd>
                </template>
                <template #course_id-post>
                    <FormModalAdd
                        v-model:open="showCourseAddForm"
                        v-model:adding="isAddingCourse"
                        :title="$t('form.add_course.title')"
                        :description="$t('form.add_course.description')"
                        :buttonLabel="$t('form.add_enrollment.button.add_course')"
                        :formRef="courseFormRef"
                    >
                        <FormAddCourse ref="courseForm" />
                    </FormModalAdd>
                </template>
            </FormField>
        </FormFieldGroup>
        <UButton
            type="submit"
            :label="$t('form.button.add')"
            class="hidden"
            :loading="isAddingEnrollment"
            block
        />
    </UForm>
</template>
