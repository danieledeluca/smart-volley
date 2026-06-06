<script setup lang="ts">
const authStore = useAuthStore();
const athletesStore = useAthletesStore();

const { canEdit } = storeToRefs(authStore);
const {
    currentAthlete: athlete,
    currentAthletePending: pending,
    currentAthleteError: error,
} = storeToRefs(athletesStore);

const title = computed(() => athlete.value?.name || $t('page.athlete.title'));

useSeoMeta({ title });

const enrollmentTableColumns = getAthleteEnrollmentsTableColumns(['season', 'activity', 'course']);

onMounted(async () => {
    await nextTick();
    athletesStore.refreshCurrentAthlete();
});
</script>

<template>
    <DashboardPanel :title>
        <template #right>
            <UButton icon="i-lucide-arrow-left" to="/dashboard/athletes" :label="$t('page.athlete.button.back')" />
        </template>
        <template v-if="pending">
            <div class="flex items-start gap-4">
                <div class="flex w-full flex-1 gap-3">
                    <USkeleton class="size-12 rounded-full" />
                    <div class="flex-1">
                        <USkeleton class="h-7 w-full max-w-60" />
                        <div class="mt-1 flex gap-2">
                            <USkeleton class="h-6 w-full max-w-32" />
                        </div>
                    </div>
                </div>
                <USkeleton v-if="canEdit" class="ml-auto size-8" />
            </div>
            <div class="grid gap-4 sm:gap-6 lg:grid-cols-12">
                <div class="space-y-4 sm:space-y-6 lg:col-span-8">
                    <div class="@container">
                        <USkeleton class="h-60 @max-2xl:h-96" />
                    </div>
                    <div class="@container">
                        <USkeleton class="h-110 @max-2xl:h-120" />
                    </div>
                </div>
                <div class="space-y-4 sm:space-y-6 lg:col-span-4">
                    <div class="@container">
                        <USkeleton class="h-60 @max-2xl:h-100" />
                    </div>
                    <div class="@container">
                        <USkeleton class="h-60 @max-2xl:h-80" />
                    </div>
                </div>
            </div>
        </template>
        <UAlert
            v-else-if="error"
            :title="error.statusMessage"
            color="error"
            icon="i-lucide-circle-x"
        />
        <template v-else-if="athlete">
            <div class="flex items-start gap-4">
                <AppUser
                    :userProps="{
                        name: athlete.name,
                        size: '3xl',
                    }"
                    :avatarSize="96"
                >
                    <template #description>
                        <span class="mt-1 flex flex-wrap gap-2">
                            <UBadge variant="soft" color="neutral" :label="athlete.fiscalCode" />
                        </span>
                    </template>
                </AppUser>
                <div v-if="canEdit" class="ml-auto">
                    <AthleteActions
                        :athleteId="athlete.id"
                        @deleteComplete="navigateTo('/dashboard/athletes')"
                        @editComplete="athletesStore.refreshCurrentAthlete"
                    />
                </div>
            </div>
            <div class="grid gap-4 sm:gap-6 lg:grid-cols-12">
                <div class="space-y-4 sm:space-y-6 lg:col-span-8">
                    <ItemCard :title="$t('card.athlete.title')" icon="i-lucide-id-card">
                        <ItemCardRecord :label="$t('card.athlete.record.name')" :value="athlete.name" />
                        <ItemCardRecord
                            :label="$t('card.athlete.record.birthdate')"
                            :value="formatDate(athlete.birthdate)"
                        />
                        <ItemCardRecord :label="$t('card.athlete.record.birthplace')" :value="athlete.birthplace" />
                        <ItemCardRecord
                            :label="$t('card.athlete.record.fiscal_code')"
                            :value="athlete.fiscalCode"
                        >
                            <template #actions>
                                <CopyButton
                                    :label="$t('card.athlete.record.fiscal_code')"
                                    :value="athlete.fiscalCode"
                                />
                            </template>
                        </ItemCardRecord>
                    </ItemCard>

                    <ItemCard
                        :title="$t('card.enrollments.title')"
                        icon="i-lucide-history"
                        class="**:data-[slot=body]:p-0"
                    >
                        <ListTable
                            :tableData="athlete.enrollments"
                            :tableColumns="enrollmentTableColumns"
                            class="col-span-2 mt-0! max-h-full **:data-[slot=root]:max-h-full **:data-[slot=root]:rounded-t-none"
                            :showPagination="true"
                            @select="(_event, row) => navigateTo(`/dashboard/enrollments/${row.original.id}`)"
                        />
                    </ItemCard>
                </div>
                <div class="space-y-4 sm:space-y-6 lg:col-span-4">
                    <ItemCard :title="$t('card.address_contacts.title')" icon="i-lucide-notebook">
                        <ItemCardRecord :label="$t('card.address_contacts.record.city')" :value="athlete.city" />
                        <ItemCardRecord
                            :label="$t('card.address_contacts.record.address')"
                            :value="athlete.address"
                        />
                        <ItemCardRecord
                            :label="$t('card.address_contacts.record.phone_number')"
                            :value="athlete.phoneNumber || EMPTY_VALUE"
                        >
                            <template v-if="athlete.phoneNumber" #actions>
                                <PhoneNumberButtons :phoneNumber="athlete.phoneNumber" />
                            </template>
                        </ItemCardRecord>
                        <ItemCardRecord
                            :label="$t('card.address_contacts.record.email')"
                            :value="athlete.email || EMPTY_VALUE"
                        >
                            <template v-if="athlete.email" #actions>
                                <EmailButton :email="athlete.email" />
                            </template>
                        </ItemCardRecord>
                    </ItemCard>

                    <ItemCard
                        v-if="athlete.parent"
                        :title="$t('card.parent.title')"
                        icon="i-lucide-user"
                    >
                        <ItemCardRecord :label="$t('card.parent.record.name')" :value="athlete.parent.name" />
                        <ItemCardRecord
                            :label="$t('card.parent.record.fiscal_code')"
                            :value="athlete.parent.fiscalCode"
                        >
                            <template #actions>
                                <CopyButton
                                    :label="$t('card.parent.record.fiscal_code')"
                                    :value="athlete.parent.fiscalCode"
                                />
                            </template>
                        </ItemCardRecord>
                        <ItemCardRecord
                            :label="$t('card.parent.record.phone_number')"
                            :value="athlete.parent.phoneNumber || EMPTY_VALUE"
                        >
                            <template v-if="athlete.parent.phoneNumber" #actions>
                                <PhoneNumberButtons :phoneNumber="athlete.parent.phoneNumber" />
                            </template>
                        </ItemCardRecord>
                        <ItemCardRecord
                            :label="$t('card.parent.record.email')"
                            :value="athlete.parent.email || EMPTY_VALUE"
                        >
                            <template v-if="athlete.parent.email" #actions>
                                <EmailButton :email="athlete.parent.email" />
                            </template>
                        </ItemCardRecord>
                    </ItemCard>
                </div>
            </div>
        </template>
    </DashboardPanel>
</template>
