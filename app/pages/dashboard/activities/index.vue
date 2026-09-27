<script setup lang="ts">
import type { SelectActivities } from '~~/lib/db/schema';

import Actions from '~/components/Activity/Actions.vue';

useSeoMeta({
    title: $t('page.activities.title'),
});

const authStore = useAuthStore();
const { isAdmin, canEdit } = storeToRefs(authStore);

const activitiesStore = useActivitiesStore();
const { activities, activitiesPending, activitiesError } = storeToRefs(activitiesStore);

const activityFormRef = useTemplateRef('activityFormRef');

const columns: (keyof SelectActivities)[] = ['id', 'name'];

if (isAdmin.value) {
    columns.push('key');
}

const tableColumns = getActivitiesTableColumns(columns);

if (canEdit.value) {
    tableColumns.push(getActionsTableColumn(Actions, (row) => ({ activityId: row.id })));
}
</script>

<template>
    <DashboardPanel :title="$t('page.activities.title')">
        <template v-if="isAdmin" #right>
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
