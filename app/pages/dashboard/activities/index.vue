<script setup lang="ts">
import DetailsActions from '~/components/Activity/DetailsActions.vue';

useSeoMeta({
    title: $t('page.activities.title'),
});

const authStore = useAuthStore();
const activitiesStore = useActivitiesStore();
const activityFormRef = useTemplateRef('activityFormRef');

const { canEdit } = storeToRefs(authStore);
const { activities, activitiesPending, activitiesError } = storeToRefs(activitiesStore);

const tableColumns = getActivitiesTableColumns(['id', 'name', 'icon']);

if (canEdit.value) {
    tableColumns.push(getActionsTableColumn(DetailsActions, (row) => ({ activityId: row.id })));
}
</script>

<template>
    <DashboardPanel :title="$t('page.activities.title')">
        <template v-if="canEdit" #right>
            <AppSlideover
                :title="$t('form.activity.add.title')"
                :description="$t('form.activity.add.description')"
                :buttonProps="{
                    label: $t('page.activities.button.add'),
                    icon: 'i-lucide-plus',
                }"
                :submitButtonProps="{
                    label: $t('form.button.add'),
                    loading: activityFormRef?.isLoading(),
                }"
                @submit="activityFormRef?.submit"
            >
                <ActivityAddForm ref="activityFormRef" />
            </AppSlideover>
        </template>
        <ListTable
            :tableData="activities"
            :tableColumns
            :isLoading="activitiesPending"
            :error="activitiesError"
            :showFilter="true"
        />
    </DashboardPanel>
</template>
