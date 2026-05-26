<script setup lang="ts">
useSeoMeta({
    title: $t('page.athletes.title'),
});

const authStore = useAuthStore();
const { canEdit } = storeToRefs(authStore);

const athletesStore = useAthletesStore();
const {
    isLoading,
    athletes,
    athletesPending,
    athletesError,
    athletesFiltersState,
    athletesFiltersFields,
} = storeToRefs(athletesStore);

const formRef = useTemplateRef('formRef');

const tableColumns = getAthletesTableColumns(['id', 'name', 'phoneNumber', 'email']);

if (canEdit.value) {
    tableColumns.push(getAthletesTableActionsColumn());
}

onBeforeRouteLeave(() => {
    if (Object.values(athletesFiltersState.value).filter((filter) => filter).length) {
        athletesStore.clearAthletesFilters();
    }
});
</script>

<template>
    <DashboardPanel :title="$t('page.athletes.title')">
        <template v-if="canEdit" #right>
            <AppSlideover
                :title="$t('form.add_athlete.title')"
                :description="$t('form.add_athlete.description')"
                :buttonProps="{
                    label: $t('page.athletes.button.add'),
                    icon: 'i-lucide-plus',
                }"
                :footerButtonProps="{
                    label: $t('form.button.add'),
                }"
                :isLoading
                @submit="formRef?.submit"
            >
                <FormAddAthlete ref="formRef" />
            </AppSlideover>
        </template>
        <ListFilters
            v-model:state="athletesFiltersState"
            :schema="AthletesFiltersSchema"
            :fields="athletesFiltersFields"
            @update="athletesStore.refreshAthletes"
            @clear="athletesStore.clearAthletesFilters"
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
