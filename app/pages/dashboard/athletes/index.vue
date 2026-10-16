<script setup lang="ts">
import DetailsActions from '~/components/Athlete/DetailsActions.vue';

useSeoMeta({
    title: $t('page.athletes.title'),
});

const authStore = useAuthStore();
const athletesStore = useAthletesStore();
const athleteAddFormRef = useTemplateRef('athleteAddFormRef');
const athleteTableRef = useTemplateRef('athleteTableRef');

const { canEdit } = storeToRefs(authStore);
const { athletes, athletesPending, athletesError } = storeToRefs(athletesStore);

const tableColumns = getAthletesTableColumns(['id', 'name', 'phoneNumber', 'email']);
tableColumns.unshift(getSelectTableColumn());
tableColumns.push(getActionsTableColumn(DetailsActions, (row) => ({ athleteId: row.id })));

function handleInteractOutside(event: Event) {
    const target = event.target as HTMLElement;

    // Inside Google Place Autocomplete
    if (target.closest('.pac-container')) {
        event.preventDefault();
    }
}
</script>

<template>
    <DashboardPanel :title="$t('page.athletes.title')">
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
                    loading: athleteAddFormRef?.isLoading(),
                }"
                @submit="athleteAddFormRef?.submit"
                @interactOutside="handleInteractOutside"
            >
                <AthleteAddForm ref="athleteAddFormRef" />
            </AppSlideover>
        </template>
        <ListTable
            ref="athleteTableRef"
            :tableData="athletes"
            :tableColumns
            :isLoading="athletesPending"
            :error="athletesError"
            :showFilter="true"
            @select="(_event, row) => navigateTo(`/dashboard/athletes/${row.original.id}`)"
        >
            <template #default>
                <div class="ml-auto">
                    <AthleteListActions
                        :selectedRows="athleteTableRef?.selectRows()"
                        :isLoading="athletesPending"
                        @deleteSuccess="athleteTableRef?.toggleAllPageRowsSelected(false)"
                    />
                </div>
            </template>
        </ListTable>
    </DashboardPanel>
</template>
