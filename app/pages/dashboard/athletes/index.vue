<script setup lang="ts">
useSeoMeta({
    title: $t('page.athletes.title'),
});

const authStore = useAuthStore();
const { canEdit } = storeToRefs(authStore);

const athletesStore = useAthletesStore();
const {
    isAddingAthlete,
    athletes,
    athletesPending,
    athletesError,
    athletesFiltersState,
    athletesFiltersFields,
} = storeToRefs(athletesStore);

const formRef = useTemplateRef('formRef');

const tableColumns = getAthletesTableColumns(['id', 'name', 'phoneNumber', 'email']);
</script>

<template>
    <DashboardPanel :title="$t('page.athletes.title')">
        <template v-if="canEdit" #right>
            <FormAddSlideover
                :title="$t('form.add_athlete.title')"
                :description="$t('form.add_athlete.description')"
                :buttonLabel="$t('page.athletes.button.add')"
                buttonIcon="i-lucide-plus"
                :isLoading="isAddingAthlete"
                @submit="formRef?.submit"
            >
                <FormAddAthlete ref="formRef" />
            </FormAddSlideover>
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
