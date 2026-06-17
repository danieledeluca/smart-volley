<script setup lang="ts">
useSeoMeta({
    title: $t('page.dashboard.title'),
});

const enrollmentsStore = useEnrollmentsStore();
const seasonsStore = useSeasonsStore();

const { enrollments, enrollmentsPending, enrollmentsError } = storeToRefs(enrollmentsStore);
const { seasons, seasonsItems, seasonsPending } = storeToRefs(seasonsStore);

const season = ref<number>();

const currentSeason = computed(() => seasons.value?.find((_season) => _season.id === season.value));
const dashboardCards = computed(() => {
    if (!enrollments.value || !currentSeason.value) {
        return [];
    }

    return getDashboardCards(enrollments.value, currentSeason.value);
});

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
            loading: seasonsPending.value,
            disabled: !season.value,
        },
    };
});

watchEffect(() => {
    season.value = seasons.value?.[0]?.id;
}, {
    flush: 'post',
});
</script>

<template>
    <DashboardPanel :title="$t('page.dashboard.title')">
        <template #right>
            <FormField
                v-if="seasonsItems && seasonsItems.length > 0"
                v-model="season"
                :field="formField"
                :showDeleteButton="false"
            />
        </template>
        <template v-if="enrollmentsPending || !season">
            <div class="flex gap-4">
                <USkeleton class="size-8" />
                <USkeleton class="h-8 w-full max-w-24" />
            </div>
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-6">
                <USkeleton class="size-8 h-40 w-full md:col-span-3" />
                <USkeleton class="size-8 h-40 w-full md:col-span-3" />
                <USkeleton class="size-8 h-40 w-full md:col-span-2" />
                <USkeleton class="size-8 h-40 w-full md:col-span-2" />
                <USkeleton class="size-8 h-40 w-full sm:col-span-2" />
            </div>
            <div>
                <USkeleton class="h-1 w-full" />
            </div>
            <div class="flex gap-4">
                <USkeleton class="size-8" />
                <USkeleton class="h-8 w-full max-w-24" />
            </div>
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-6">
                <USkeleton class="size-8 h-40 w-full md:col-span-3" />
                <USkeleton class="size-8 h-40 w-full md:col-span-3" />
                <USkeleton class="size-8 h-40 w-full md:col-span-2" />
                <USkeleton class="size-8 h-40 w-full md:col-span-2" />
                <USkeleton class="size-8 h-40 w-full sm:col-span-2" />
            </div>
        </template>
        <UAlert
            v-else-if="enrollmentsError"
            :title="enrollmentsError.statusMessage"
            color="error"
            icon="i-lucide-circle-x"
        />
        <template v-else-if="enrollments && enrollments.length > 0">
            <template v-for="(data, activity, index) in dashboardCards" :key="activity">
                <h2 class="flex items-center gap-4 text-2xl">
                    <UButton variant="soft" :icon="data.icon" />
                    <span>{{ activity }}</span>
                </h2>
                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-6">
                    <DashboardCard
                        v-for="(card, cardIndex) in data.cards"
                        :key="card.title"
                        v-bind="card"
                        :class="{
                            'md:col-span-3': cardIndex === 0 || cardIndex === 1,
                            'md:col-span-2': cardIndex === 2 || cardIndex === 3,
                            'sm:col-span-2': cardIndex === 4,
                        }"
                    />
                </div>
                <USeparator v-if="index !== Object.entries(dashboardCards).length - 1" icon="i-lucide-zap" />
            </template>
        </template>
        <UAlert
            v-else
            :title="$t('page.dashboard.error')"
            color="error"
            icon="i-lucide-circle-x"
        />
    </DashboardPanel>
</template>
