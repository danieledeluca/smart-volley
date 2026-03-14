<script setup lang="ts">
useSeoMeta({
    title: $t('page.athletes.title'),
});

const athletesStore = useAthletesStore();
const {
    athletes,
    athletesPending,
    athletesError,
    athletesFiltersState,
    athletesFiltersFields,
    showAthleteAddForm,
    isAddingAthlete,
} = storeToRefs(athletesStore);

const tableColumns = getAthletesTableColumns(['name', 'phone_number', 'email']);

const formRef = useTemplateRef('form');
</script>

<template>
    <UPageHeader :title="$t('page.athletes.header.title')" :description="$t('page.athletes.header.description')">
        <template #links>
            <FormSlideOverAdd
                v-model:open="showAthleteAddForm"
                v-model:adding="isAddingAthlete"
                :title="$t('form.add_athlete.title')"
                :description="$t('form.add_athlete.description')"
                :buttonLabel="$t('page.athletes.button.add')"
                buttonIcon="i-lucide-user-plus"
                :formRef
            >
                <FormAddAthlete ref="form" />
            </FormSlideOverAdd>
        </template>
    </UPageHeader>
    <ListFilters
        v-model:state="athletesFiltersState"
        :schema="athletesFiltersSchema"
        :fields="athletesFiltersFields"
        @update="athletesStore.refreshAthletes"
        @clear="athletesStore.clearAthletesFilters"
    />
    <ListTable
        :isLoading="athletesPending"
        :error="athletesError"
        :tableData="athletes"
        :tableColumns
        :onSelect="onAthleteSelect"
    />
</template>
