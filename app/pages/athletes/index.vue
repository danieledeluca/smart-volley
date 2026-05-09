<script setup lang="ts">
useSeoMeta({
    title: $t('page.athletes.title'),
});

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

const tableColumns = getAthletesTableColumns(['name', 'phoneNumber', 'email']);
</script>

<template>
    <UPageHeader :title="$t('page.athletes.header.title')" :description="$t('page.athletes.header.description')">
        <template #links>
            <FormAddSlideover
                :title="$t('form.add_athlete.title')"
                :description="$t('form.add_athlete.description')"
                :buttonLabel="$t('page.athletes.button.add')"
                buttonIcon="i-lucide-user-plus"
                :isLoading="isAddingAthlete"
                @submit="formRef?.submit"
            >
                <FormAddAthlete ref="formRef" />
            </FormAddSlideover>
        </template>
    </UPageHeader>
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
        @select="(_event, row) => navigateTo(`/athletes/${row.original.id}`)"
    />
</template>
