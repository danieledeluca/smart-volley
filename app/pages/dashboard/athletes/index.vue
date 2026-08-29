<script setup lang="ts">
import Actions from '~/components/Athlete/Actions.vue';

useSeoMeta({
    title: $t('page.athletes.title'),
});

const authStore = useAuthStore();
const athletesStore = useAthletesStore();

const { canEdit } = storeToRefs(authStore);
const { athletes, athletesPending, athletesError } = storeToRefs(athletesStore);

const athleteAddFormRef = useTemplateRef('athleteAddFormRef');
const athleteDeleteFormRef = useTemplateRef('athleteDeleteFormRef');
const athleteTableRef = useTemplateRef('athleteTableRef');

const deleteModalOpen = ref(false);

const tableColumns = getAthletesTableColumns(['id', 'name', 'phoneNumber', 'email']);

if (canEdit.value) {
    tableColumns.unshift(getSelectTableColumn());
    tableColumns.push(getActionsTableColumn(Actions, (row) => ({ athleteId: row.id })));
}

function handleInteractOutside(event: Event) {
    const target = event.target as HTMLElement;

    // Inside Google Place Autocomplete
    if (target.closest('.pac-container')) {
        event.preventDefault();
    }
}

function handelDeleteSuccess() {
    deleteModalOpen.value = false;

    athleteTableRef.value?.toggleAllPageRowsSelected(false);
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
                    <ListDeleteButton
                        v-if="canEdit"
                        v-model:open="deleteModalOpen"
                        :title="$t('form.athlete.multiple_delete.title')"
                        :description="$t('form.athlete.multiple_delete.description')"
                        :isDisabled="athletesPending || (athleteTableRef?.selectRows()?.length || 0) === 0"
                        :isLoading="athleteDeleteFormRef?.isLoading()"
                        @submit="athleteDeleteFormRef?.submit()"
                    >
                        <AthleteMultipleDeleteForm
                            ref="athleteDeleteFormRef"
                            :athletes="athleteTableRef?.selectRows()?.map((row) => row.original) || []"
                            @success="handelDeleteSuccess"
                        />
                    </ListDeleteButton>
                </div>
            </template>
        </ListTable>
    </DashboardPanel>
</template>
