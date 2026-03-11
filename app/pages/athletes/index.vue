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
            <USlideover v-model:open="showAthleteAddForm" :title="$t('form.add_athlete.title')">
                <UButton :label="$t('page.athletes.button.add')" variant="solid" icon="i-lucide-user-plus" />
                <template #body>
                    <FormAddAthlete ref="form" />
                </template>
                <template #footer>
                    <UButton
                        type="submit"
                        :label="$t('form.button.add')"
                        :loading="isAddingAthlete"
                        icon="i-lucide-plus"
                        block
                        @click="formRef?.submit()"
                    />
                </template>
            </USlideover>
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
