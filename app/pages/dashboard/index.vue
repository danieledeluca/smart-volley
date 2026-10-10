<script setup lang="ts">
useSeoMeta({
    title: $t('page.dashboard.title'),
});

const dashBoardStore = useDashboardStore();

const {
    stats,
    statsPending,
    statsError,
    seasons,
    seasonsItems,
    seasonsPending,
    seasonId,
} = storeToRefs(dashBoardStore);

const formField = computed<FormField<{ seasonId?: number }>>(() => {
    return {
        renderAs: 'select-menu',
        formFieldProps: {
            name: 'seasonId',
        },
        selectProps: {
            placeholder: $t('form.field.season_id.placeholder'),
            icon: 'i-lucide-calendar',
            items: seasonsItems.value,
            loading: seasonsPending.value || !seasonId.value,
            disabled: !seasonId.value,
        },
    };
});

const isLoading = computed(() => {
    return statsPending.value || (seasonsItems.value && seasonsItems.value.length > 0 && !seasonId.value);
});
</script>

<template>
    <DashboardPanel :title="$t('page.dashboard.title')">
        <template #right>
            <FormField v-model="seasonId" :field="formField" :showDeleteButton="false" />
        </template>
        <template v-if="isLoading">
            <div class="flex gap-4">
                <USkeleton class="size-8" />
                <USkeleton class="h-8 w-full max-w-24" />
            </div>
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-6">
                <USkeleton v-for="n in 2" :key="n" class="size-8 h-40 w-full md:col-span-2" />
                <USkeleton class="size-8 h-40 w-full sm:col-span-2 md:col-span-2" />
                <USkeleton v-for="n in 2" :key="n" class="size-8 h-40 w-full md:col-span-3" />
            </div>
            <div>
                <USkeleton class="h-1 w-full" />
            </div>
            <div class="flex gap-4">
                <USkeleton class="size-8" />
                <USkeleton class="h-8 w-full max-w-24" />
            </div>
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-6">
                <USkeleton v-for="n in 2" :key="n" class="size-8 h-40 w-full md:col-span-2" />
                <USkeleton class="size-8 h-40 w-full sm:col-span-2 md:col-span-2" />
                <USkeleton v-for="n in 2" :key="n" class="size-8 h-40 w-full md:col-span-3" />
            </div>
        </template>
        <UAlert
            v-else-if="statsError"
            :title="getApiError(statsError)"
            color="error"
            icon="i-lucide-circle-x"
        />
        <template v-else-if="stats">
            <template v-for="(activityStats, index) in stats" :key="activityStats.activityId">
                <div class="flex items-center gap-4 text-2xl">
                    <span>{{ activityStats.activityName }}</span>
                </div>
                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-6">
                    <DashboardCard
                        v-for="(card, cardIndex) in getDashboardCards(activityStats)"
                        :key="cardIndex"
                        v-bind="card"
                        :badgeLabel="card.badgeLabel || `${seasons?.at(-1)?.startYear}/${seasons?.[0]?.endYear}`"
                        :class="{
                            'md:col-span-2': cardIndex === 0 || cardIndex === 1 || cardIndex === 2,
                            'md:col-span-3': cardIndex === 3 || cardIndex === 4,
                            'sm:col-span-2': cardIndex === 2,
                        }"
                    />
                </div>
                <USeparator v-if="index !== stats.length - 1" icon="i-lucide-zap" />
            </template>
        </template>
        <NoData v-else />
    </DashboardPanel>
</template>
