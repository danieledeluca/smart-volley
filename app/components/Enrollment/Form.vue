<script setup lang="ts">
import { InsertEnrollment } from '~~/lib/db/schema';

const enrollmentsStore = useEnrollmentsStore();
const athletesStore = useAthletesStore();
const seasonsStore = useSeasonsStore();
const activitiesStore = useActivitiesStore();
const coursesStore = useCoursesStore();

const {
    isLoading: isEnrollmentsLoading,
    addingEnrollmentErrors,
    enrollmentAddState,
    enrollmentAddFields,
} = storeToRefs(enrollmentsStore);
const { isLoading: isAthletesLoading } = storeToRefs(athletesStore);
const { isLoading: isSeasonsLoading } = storeToRefs(seasonsStore);
const { isLoading: isActivitiesLoading } = storeToRefs(activitiesStore);
const { isLoading: isCoursesLoading } = storeToRefs(coursesStore);

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
                    <AppModal
                        :title="$t('form.athlete.add.title')"
                        :description="$t('form.athlete.add.description')"
                        :buttonProps="{
                            label: $t('form.athlete.add.title'),
                            icon: 'i-lucide-plus',
                            variant: 'soft',
                            block: true,
                        }"
                        :footerButtonProps="{
                            label: $t('form.button.add'),
                        }"
                        :isLoading="isAthletesLoading"
                        @submit="athleteFormRef?.[0]?.submit"
                    >
                        <AthleteForm ref="athleteFormRef" />
                    </AppModal>
                </template>
                <template #seasonId-post>
                    <AppModal
                        :title="$t('form.season.add.title')"
                        :description="$t('form.season.add.description')"
                        :buttonProps="{
                            label: $t('form.season.add.title'),
                            icon: 'i-lucide-plus',
                            variant: 'soft',
                            block: true,
                        }"
                        :footerButtonProps="{
                            label: $t('form.button.add'),
                        }"
                        :isLoading="isSeasonsLoading"
                        @submit="seasonFormRef?.[0]?.submit"
                    >
                        <SeasonForm ref="seasonFormRef" />
                    </AppModal>
                </template>
                <template #activityId-post>
                    <AppModal
                        :title="$t('form.activity.add.title')"
                        :description="$t('form.activity.add.description')"
                        :buttonProps="{
                            label: $t('form.activity.add.title'),
                            icon: 'i-lucide-plus',
                            variant: 'soft',
                            block: true,
                        }"
                        :footerButtonProps="{
                            label: $t('form.button.add'),
                        }"
                        :isLoading="isActivitiesLoading"
                        @submit="activityFormRef?.[0]?.submit"
                    >
                        <ActivityForm ref="activityFormRef" />
                    </AppModal>
                </template>
                <template #courseId-post>
                    <AppModal
                        :title="$t('form.course.add.title')"
                        :description="$t('form.course.add.description')"
                        :buttonProps="{
                            label: $t('form.course.add.title'),
                            icon: 'i-lucide-plus',
                            variant: 'soft',
                            block: true,
                        }"
                        :footerButtonProps="{
                            label: $t('form.button.add'),
                        }"
                        :isLoading="isCoursesLoading"
                        @submit="courseFormRef?.[0]?.submit"
                    >
                        <CourseForm ref="courseFormRef" />
                    </AppModal>
                </template>
            </FormField>
        </FormFieldGroup>
        <UButton
            type="submit"
            :label="$t('form.button.add')"
            :loading="isEnrollmentsLoading"
            class="hidden"
            block
        />
    </UForm>
</template>
