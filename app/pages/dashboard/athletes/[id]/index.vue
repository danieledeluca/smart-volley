<script setup lang="ts">
const athletesStore = useAthletesStore();
const {
    currentAthlete: athlete,
    currentAthletePending: pending,
    currentAthleteError: error,
} = storeToRefs(athletesStore);

const title = computed(() => athlete.value?.name || $t('page.athlete.title'));

useSeoMeta({ title });

const enrollmentsTableColumns = getAthleteEnrollmentsTableColumns(['season', 'activity', 'course']);

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
        <AthleteDetailsLoader v-if="pending && !athlete" />
        <UAlert
            v-else-if="error"
            :title="getApiError(error)"
            color="error"
            icon="i-lucide-circle-x"
        />
        <template v-else-if="athlete">
            <PageUser :name="athlete.name" :badgeLabels="[athlete.fiscalCode]">
                <AthleteActions
                    :athleteId="athlete.id"
                    @deleteComplete="navigateTo('/dashboard/athletes')"
                    @editClose="$event ? athletesStore.refreshCurrentAthlete() : undefined"
                />
            </PageUser>
            <div class="details-grid">
                <div class="details-col details-col-main">
                    <ItemCard :title="$t('card.personal_information.title')" icon="i-lucide-id-card">
                        <ItemCardRecord :label="$t('card.personal_information.record.name')" :value="athlete.name" />
                        <ItemCardRecord
                            :label="$t('card.personal_information.record.birthdate')"
                            :value="formatDate(athlete.birthdate)"
                        />
                        <ItemCardRecord
                            :label="$t('card.personal_information.record.birthplace')"
                            :value="athlete.birthplaceFormattedAddress"
                        >
                            <template #actions>
                                <CopyButton
                                    :label="$t('card.personal_information.record.birthplace')"
                                    :value="athlete.birthplaceFormattedAddress"
                                />
                            </template>
                        </ItemCardRecord>
                        <ItemCardRecord
                            :label="$t('card.personal_information.record.fiscal_code')"
                            :value="athlete.fiscalCode"
                        >
                            <template #actions>
                                <CopyButton
                                    :label="$t('card.personal_information.record.fiscal_code')"
                                    :value="athlete.fiscalCode"
                                />
                            </template>
                        </ItemCardRecord>
                    </ItemCard>

                    <ItemCard :title="$t('card.enrollments.title')" icon="i-lucide-history">
                        <ListTable
                            :tableData="athlete.enrollments"
                            :tableColumns="enrollmentsTableColumns"
                            :showPagination="true"
                            @select="(_event, row) => navigateTo(`/dashboard/enrollments/${row.original.id}`)"
                        />
                    </ItemCard>
                </div>
                <div class="details-col details-col-aside">
                    <ItemCard :title="$t('card.address_contacts.title')" icon="i-lucide-notebook">
                        <ItemCardRecord
                            :label="$t('card.address_contacts.record.address')"
                            :value="athlete.addressFormattedAddress"
                        >
                            <template #actions>
                                <CopyButton
                                    :label="$t('card.address_contacts.record.address')"
                                    :value="athlete.addressFormattedAddress"
                                />
                            </template>
                        </ItemCardRecord>
                        <ItemCardRecord
                            :label="$t('card.address_contacts.record.phone_number')"
                            :value="athlete.phoneNumber"
                        >
                            <template v-if="athlete.phoneNumber" #actions>
                                <PhoneNumberButtons :phoneNumber="athlete.phoneNumber" />
                            </template>
                        </ItemCardRecord>
                        <ItemCardRecord :label="$t('card.address_contacts.record.email')" :value="athlete.email">
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
                        <ItemCardRecord :label="$t('card.parent.record.name')" :value="athlete.parent.name">
                            <template #actions>
                                <UButton
                                    variant="ghost"
                                    icon="i-lucide-arrow-up-right"
                                    :to="`/dashboard/parents/${athlete.parent.id}`"
                                />
                            </template>
                        </ItemCardRecord>
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
                            :value="athlete.parent.phoneNumber"
                        >
                            <template v-if="athlete.parent.phoneNumber" #actions>
                                <PhoneNumberButtons :phoneNumber="athlete.parent.phoneNumber" />
                            </template>
                        </ItemCardRecord>
                        <ItemCardRecord :label="$t('card.parent.record.email')" :value="athlete.parent.email ">
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
