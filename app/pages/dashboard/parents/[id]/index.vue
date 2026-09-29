<script setup lang="ts">
const authStore = useAuthStore();
const parentsStore = useParentsStore();

const { canEdit } = storeToRefs(authStore);
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
                        <USkeleton class="h-44 @max-2xl:h-60" />
                    </div>
                    <div class="@container">
                        <USkeleton class="h-60 @max-2xl:h-120" />
                    </div>
                </div>
                <div class="space-y-4 sm:space-y-6 lg:col-span-4">
                    <div class="@container">
                        <USkeleton class="h-44 @max-2xl:h-60" />
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
        <template v-else-if="parent">
            <div class="flex items-start gap-4">
                <AppUser
                    :userProps="{
                        name: parent.name,
                        size: '3xl',
                    }"
                    :avatarSize="96"
                >
                    <template #description>
                        <span class="mt-1 flex flex-wrap gap-2">
                            <UBadge variant="soft" color="neutral" :label="parent.fiscalCode" />
                        </span>
                    </template>
                </AppUser>
                <div v-if="canEdit" class="ml-auto">
                    <ParentActions
                        :parentId="parent.id"
                        @deleteComplete="navigateTo('/dashboard/parents')"
                        @editClose="(id) => id ? parentsStore.refreshCurrentParent() : undefined"
                    />
                </div>
            </div>
            <div class="grid gap-4 sm:gap-6 lg:grid-cols-12">
                <div class="space-y-4 sm:space-y-6 lg:col-span-8">
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
                <div class="space-y-4 sm:space-y-6 lg:col-span-4">
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
