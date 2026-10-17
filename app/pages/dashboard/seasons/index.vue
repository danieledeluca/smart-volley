<script setup lang="ts">
import DetailsActions from '~/components/Season/DetailsActions.vue';

useSeoMeta({
    title: $t('page.seasons.title'),
});

const authStore = useAuthStore();
const seasonsStore = useSeasonsStore();
const seasonFormRef = useTemplateRef('seasonFormRef');

const { canEdit } = storeToRefs(authStore);
const { seasons, seasonsPending, seasonsError } = storeToRefs(seasonsStore);

const tableColumns = getSeasonsTableColumns(['id', 'startYear', 'endYear']);
tableColumns.push(getActionsTableColumn(DetailsActions, (row) => ({ seasonId: row.id })));
</script>

<template>
    <DashboardPanel :title="$t('page.seasons.title')">
        <template v-if="canEdit" #right>
            <AppSlideover
                :title="$t('form.season.add.title')"
                :description="$t('form.season.add.description')"
                :buttonProps="{
                    label: $t('page.seasons.button.add'),
                    icon: 'i-lucide-plus',
                }"
                :submitButtonProps="{
                    label: $t('form.button.add'),
                    loading: seasonFormRef?.isLoading(),
                }"
                :preventClose="seasonFormRef?.isLoading()"
                @submit="seasonFormRef?.submit"
            >
                <SeasonAddForm ref="seasonFormRef" />
            </AppSlideover>
        </template>
        <ListTable
            :tableData="seasons"
            :tableColumns
            :isLoading="seasonsPending"
            :error="seasonsError"
            :showFilter="true"
        />
    </DashboardPanel>
</template>
