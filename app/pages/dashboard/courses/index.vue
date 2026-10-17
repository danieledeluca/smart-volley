<script setup lang="ts">
import DetailsActions from '~/components/Course/DetailsActions.vue';

useSeoMeta({
    title: $t('page.courses.title'),
});

const authStore = useAuthStore();
const coursesStore = useCoursesStore();
const courseFormRef = useTemplateRef('courseFormRef');

const { canEdit } = storeToRefs(authStore);
const { courses, coursesPending, coursesError } = storeToRefs(coursesStore);

const tableColumns = getCoursesTableColumns(['id', 'code', 'name', 'activity']);
tableColumns.push(getActionsTableColumn(DetailsActions, (row) => ({ courseId: row.id })));
</script>

<template>
    <DashboardPanel :title="$t('page.courses.title')">
        <template v-if="canEdit" #right>
            <AppSlideover
                :title="$t('form.course.add.title')"
                :description="$t('form.course.add.description')"
                :buttonProps="{
                    label: $t('page.courses.button.add'),
                    icon: 'i-lucide-plus',
                }"
                :submitButtonProps="{
                    label: $t('form.button.add'),
                    loading: courseFormRef?.isLoading(),
                }"
                :preventClose="courseFormRef?.isLoading()"
                @submit="courseFormRef?.submit"
            >
                <CourseAddForm ref="courseFormRef" />
            </AppSlideover>
        </template>
        <ListTable
            :tableData="courses"
            :tableColumns
            :isLoading="coursesPending"
            :error="coursesError"
            :showFilter="true"
        />
    </DashboardPanel>
</template>
