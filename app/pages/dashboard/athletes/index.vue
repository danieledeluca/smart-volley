<script setup lang="ts">
import Actions from '~/components/Athlete/Actions.vue';

useSeoMeta({
    title: $t('page.athletes.title'),
});

const authStore = useAuthStore();
const { canEdit } = storeToRefs(authStore);

const athletesStore = useAthletesStore();
const {
    athletes,
    athletesPending,
    athletesError,
    filterState,
    filterFields,
} = storeToRefs(athletesStore);

const athleteFormRef = useTemplateRef('athleteFormRef');

const tableColumns = getAthletesTableColumns(['id', 'name', 'phoneNumber', 'email']);

if (canEdit.value) {
    tableColumns.push(getActionsTableColumn(Actions, (row) => ({ athleteId: row.id })));
}

onBeforeRouteLeave(() => {
    if (Object.values(filterState.value).filter((filter) => filter).length) {
        athletesStore.clearFilters();
    }
});
</script>

<template>
    <DashboardPanel :title="$t('page.athletes.title')" :wrapBody="true">
        <template v-if="canEdit" #right>
            <AppSlideover
                :title="$t('form.athlete.add.title')"
                :description="$t('form.athlete.add.description')"
                :buttonProps="{
                    label: $t('page.athletes.button.add'),
                    icon: 'i-lucide-plus',
                }"
                :submitButtonProps="{
                    label: $t('form.button.add'),
                    loading: athleteFormRef?.isLoading(),
                }"
                @submit="athleteFormRef?.submit"
            >
                <AthleteAddForm ref="athleteFormRef" />
            </AppSlideover>
        </template>
        <ListFilters
            v-model:state="filterState"
            :schema="AthletesFiltersSchema"
            :fields="filterFields"
            @update="athletesStore.refreshAthletes"
            @clear="athletesStore.clearFilters"
        />
        <ListTable
            :tableData="athletes"
            :tableColumns
            :isLoading="athletesPending"
            :error="athletesError"
            @select="(_event, row) => navigateTo(`/dashboard/athletes/${row.original.id}`)"
        />
    </DashboardPanel>
</template>
