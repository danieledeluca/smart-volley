<script setup lang="ts">
const parentsStore = useParentsStore();
const { currentParent: parent, currentParentPending: pending, currentParentError: error } = storeToRefs(parentsStore);

const title = computed(() => parent.value?.name || $t('page.parent.title'));

useSeoMeta({ title });

const athletesTableColumns = getParentAthletesTableColumns(['name', 'fiscalCode']);

onMounted(async () => {
    await nextTick();
    parentsStore.refreshCurrentParent();
});
</script>

<template>
    <DashboardPanel :title>
        <template #right>
            <UButton icon="i-lucide-arrow-left" to="/dashboard/parents" :label="$t('page.parent.button.back')" />
        </template>
        <ParentDetailsLoader v-if="pending && !parent" />
        <UAlert
            v-else-if="error"
            :title="getApiError(error)"
            color="error"
            icon="i-lucide-circle-x"
        />
        <template v-else-if="parent">
            <PageUser :name="parent.name" :badgeLabels="[parent.fiscalCode]">
                <ParentActions
                    :parentId="parent.id"
                    @deleteComplete="navigateTo('/dashboard/parents')"
                    @editClose="(id) => id ? parentsStore.refreshCurrentParent() : undefined"
                />
            </PageUser>
            <div class="details-grid">
                <div class="details-col details-col-main">
                    <ItemCard :title="$t('card.personal_information.title')" icon="i-lucide-id-card">
                        <ItemCardRecord :label="$t('card.personal_information.record.name')" :value="parent.name" />
                        <ItemCardRecord
                            :label="$t('card.personal_information.record.fiscal_code')"
                            :value="parent.fiscalCode"
                        >
                            <template #actions>
                                <CopyButton
                                    :label="$t('card.personal_information.record.fiscal_code')"
                                    :value="parent.fiscalCode"
                                />
                            </template>
                        </ItemCardRecord>
                    </ItemCard>

                    <ItemCard :title="$t('card.children.title')" icon="i-lucide-users">
                        <ListTable
                            :tableData="parent.athletes"
                            :tableColumns="athletesTableColumns"
                            :showPagination="true"
                            @select="(_event, row) => navigateTo(`/dashboard/athletes/${row.original.id}`)"
                        />
                    </ItemCard>
                </div>
                <div class="details-col details-col-aside">
                    <ItemCard :title="$t('card.address_contacts.title')" icon="i-lucide-notebook">
                        <ItemCardRecord
                            :label="$t('card.address_contacts.record.phone_number')"
                            :value="parent.phoneNumber"
                        >
                            <template v-if="parent.phoneNumber" #actions>
                                <PhoneNumberButtons :phoneNumber="parent.phoneNumber" />
                            </template>
                        </ItemCardRecord>
                        <ItemCardRecord :label="$t('card.address_contacts.record.email')" :value="parent.email">
                            <template v-if="parent.email" #actions>
                                <EmailButton :email="parent.email" />
                            </template>
                        </ItemCardRecord>
                    </ItemCard>
                </div>
            </div>
        </template>
    </DashboardPanel>
</template>
