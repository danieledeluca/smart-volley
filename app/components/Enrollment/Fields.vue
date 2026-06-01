<script setup lang="ts">
import type { InsertEnrollment } from '~~/lib/db/schema';

const state = defineModel<Partial<InsertEnrollment>>('state', {
    required: true,
});

const { formFields } = useForm('enrollment');

const athleteFormRef = useTemplateRef('athleteFormRef');
const seasonFormRef = useTemplateRef('seasonFormRef');
const activityFormRef = useTemplateRef('activityFormRef');
const courseFormRef = useTemplateRef('courseFormRef');

const open = ref(false);

function handleSuccess<K extends keyof InsertEnrollment>(key: K, id?: InsertEnrollment[K]) {
    open.value = false;

    state.value[key] = id;
}
</script>

<template>
    <FormFieldGroup
        v-for="(group, index) in formFields"
        :key="index"
        :title="group.title"
        :icon="group.icon"
    >
        <FormField
            v-for="(field, fieldIndex) in group.fields"
            :key="fieldIndex"
            v-model="state[field.formFieldProps.name]"
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
                    :isLoading="Boolean(athleteFormRef?.[0]?.isLoading())"
                    @submit="athleteFormRef?.[0]?.submit"
                >
                    <AthleteAddForm ref="athleteFormRef" @success="handleSuccess('athleteId', $event)" />
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
                    :isLoading="Boolean(seasonFormRef?.[0]?.isLoading())"
                    @submit="seasonFormRef?.[0]?.submit"
                >
                    <SeasonAddForm ref="seasonFormRef" @success="handleSuccess('seasonId', $event)" />
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
                    :isLoading="Boolean(activityFormRef?.[0]?.isLoading())"
                    @submit="activityFormRef?.[0]?.submit"
                >
                    <ActivityAddForm ref="activityFormRef" @success="handleSuccess('activityId', $event)" />
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
                    :isLoading="Boolean(courseFormRef?.[0]?.isLoading())"
                    @submit="courseFormRef?.[0]?.submit"
                >
                    <CourseAddForm ref="courseFormRef" @success="handleSuccess('courseId', $event)" />
                </AppModal>
            </template>
        </FormField>
    </FormFieldGroup>
</template>
