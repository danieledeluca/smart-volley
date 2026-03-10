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

const formRef = useTemplateRef('form');
</script>

<template>
    <UPageHeader :title="$t('page.athletes.header.title')" :description="$t('page.athletes.header.description')">
        <template #links>
            <USlideover v-model:open="showAthleteAddForm" title="Add new athlete">
                <UButton
                    label="Add new athlete"
                    color="primary"
                    variant="solid"
                    icon="i-lucide-user-plus"
                />

                <template #body>
                    <FormAddAthlete ref="form" />
                </template>
                <template #footer>
                    <UButton
                        type="submit"
                        label="Submit"
                        :loading="isAddingAthlete"
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
        :tableColumns="getAthletesTableColumns(['name', 'phone_number', 'email'])"
        :onSelect="onAthleteSelect"
    />
</template>
