<script setup lang="ts">
import Actions from '~/components/Course/Actions.vue';

useSeoMeta({
    title: $t('page.courses.title'),
});

const authStore = useAuthStore();
const coursesStore = useCoursesStore();
const courseFormRef = useTemplateRef('courseFormRef');

const { canEdit } = storeToRefs(authStore);
const { courses, coursesPending, coursesError } = storeToRefs(coursesStore);

const tableColumns = getCoursesTableColumns(['id', 'code', 'name', 'activity']);

if (canEdit.value) {
    tableColumns.push(getActionsTableColumn(Actions, (row) => ({ courseId: row.id })));
}
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
