<script setup lang="ts">
import type { InsertEnrollment } from '~~/lib/db/schema';

const state = defineModel<Partial<InsertEnrollment>>('state', {
    required: true,
});

const coursesStore = useCoursesStore();

const { formFields } = useForm('enrollment');

const athleteFormRef = useTemplateRef('athleteFormRef');
const seasonFormRef = useTemplateRef('seasonFormRef');
const courseFormRef = useTemplateRef('courseFormRef');

const { courses } = storeToRefs(coursesStore);

const selectedCourse = computed(() => courses.value?.find((course) => course.id === state.value.courseId));

const openModal = reactive<Partial<Record<keyof InsertEnrollment, boolean>>>({
    athleteId: false,
    seasonId: false,
    courseId: false,
});

function handleInteractOutside(event: Event) {
    const target = event.target as HTMLElement;

    // Inside Google Place Autocomplete
    if (target.closest('.pac-container')) {
        event.preventDefault();
    }
}

function handleSuccess<K extends keyof InsertEnrollment>(key: K, id?: InsertEnrollment[K]) {
    openModal[key] = false;
    state.value[key] = id;
}

function showField(fieldName: keyof InsertEnrollment) {
    if (!state.value.courseId) {
        return true;
    }

    if (fieldName.startsWith('volley')) {
        return selectedCourse.value?.activity.key === 'volley';
    }

    if (fieldName.startsWith('gymnastics')) {
        return selectedCourse.value?.activity.key === 'gymnastics';
    }

    return true;
}

watch(selectedCourse, (newSelectedCourse) => {
    if (newSelectedCourse?.activity.key === 'volley') {
        state.value.gymnasticsFirstInstallment = undefined;
        state.value.gymnasticsFirstInstallmentDate = undefined;
        state.value.gymnasticsFirstInstallmentType = undefined;
        state.value.gymnasticsSecondInstallment = undefined;
        state.value.gymnasticsSecondInstallmentDate = undefined;
        state.value.gymnasticsSecondInstallmentType = undefined;
        state.value.gymnasticsThirdInstallment = undefined;
        state.value.gymnasticsThirdInstallmentDate = undefined;
        state.value.gymnasticsThirdInstallmentType = undefined;
    }

    if (newSelectedCourse?.activity.key === 'gymnastics') {
        state.value.volleyAccount = undefined;
        state.value.volleyAccountDate = undefined;
        state.value.volleyAccountType = undefined;
        state.value.volleyBalance = undefined;
        state.value.volleyBalanceDate = undefined;
        state.value.volleyBalanceType = undefined;
        state.value.volleySecondBalance = undefined;
        state.value.volleySecondBalanceDate = undefined;
        state.value.volleySecondBalanceType = undefined;
    }
});
</script>

<template>
    <FormFieldGroup
        v-for="(group, index) in formFields"
        :key="index"
        :title="group.title"
        :icon="group.icon"
    >
        <template
            v-for="(field, fieldIndex) in group.fields"
            :key="fieldIndex"
        >
            <FormField v-if="showField(field.formFieldProps.name)" v-model="state[field.formFieldProps.name]" :field>
                <template #athleteId-post>
                    <AppModal
                        v-model:open="openModal.athleteId"
                        :title="$t('form.athlete.add.title')"
                        :description="$t('form.athlete.add.description')"
                        :buttonProps="{
                            label: $t('form.athlete.add.title'),
                            icon: 'i-lucide-plus',
                            variant: 'soft',
                            block: true,
                        }"
                        :submitButtonProps="{
                            label: $t('form.button.add'),
                            loading: athleteFormRef?.[0]?.isLoading(),
                        }"
                        @submit="athleteFormRef?.[0]?.submit()"
                        @interactOutside="handleInteractOutside"
                    >
                        <AthleteAddForm ref="athleteFormRef" @success="handleSuccess('athleteId', $event)" />
                    </AppModal>
                </template>
                <template #seasonId-post>
                    <AppModal
                        v-model:open="openModal.seasonId"
                        :title="$t('form.season.add.title')"
                        :description="$t('form.season.add.description')"
                        :buttonProps="{
                            label: $t('form.season.add.title'),
                            icon: 'i-lucide-plus',
                            variant: 'soft',
                            block: true,
                        }"
                        :submitButtonProps="{
                            label: $t('form.button.add'),
                            loading: seasonFormRef?.[0]?.isLoading(),
                        }"
                        @submit="seasonFormRef?.[0]?.submit()"
                    >
                        <SeasonAddForm ref="seasonFormRef" @success="handleSuccess('seasonId', $event)" />
                    </AppModal>
                </template>
                <template #courseId-post>
                    <AppModal
                        v-model:open="openModal.courseId"
                        :title="$t('form.course.add.title')"
                        :description="$t('form.course.add.description')"
                        :buttonProps="{
                            label: $t('form.course.add.title'),
                            icon: 'i-lucide-plus',
                            variant: 'soft',
                            block: true,
                        }"
                        :submitButtonProps="{
                            label: $t('form.button.add'),
                            loading: courseFormRef?.[0]?.isLoading(),
                        }"
                        @submit="courseFormRef?.[0]?.submit()"
                    >
                        <CourseAddForm ref="courseFormRef" @success="handleSuccess('courseId', $event)" />
                    </AppModal>
                </template>
                <template #volleyAccountType-post>
                    <USeparator size="md" class="mt-4" />
                </template>
                <template #volleyBalanceType-post>
                    <USeparator size="md" class="mt-4" />
                </template>
                <template v-if="!selectedCourse" #volleySecondBalanceType-post>
                    <USeparator size="md" class="mt-4" />
                </template>
                <template #gymnasticsFirstInstallmentType-post>
                    <USeparator size="md" class="mt-4" />
                </template>
                <template #gymnasticsSecondInstallmentType-post>
                    <USeparator size="md" class="mt-4" />
                </template>
            </FormField>
        </template>
    </FormFieldGroup>
</template>
