<script setup lang="ts">
const route = useRoute();

const { data: enrollment, pending, error } = useLazyFetch(`/api/enrollments/${route.params.id}`, {
    headers: useRequestHeaders(['cookie']),
});

const title = computed(() => enrollment.value?.athlete.name || $t('page.enrollment.title'));

useSeoMeta({ title });

const CertificateDate = computed(() => getCertificateDateNode(enrollment.value?.certificateExpirationDate || null));
</script>

<template>
    <DashboardPanel :title>
        <template #right>
            <UButton
                icon="i-lucide-arrow-left"
                to="/dashboard/enrollments"
                :label="$t('page.enrollment.button.back')"
            />
        </template>
        <template v-if="pending">
            <div class="mb-6 flex gap-4 max-md:flex-col sm:mb-8 md:items-center">
                <div class="flex gap-3">
                    <USkeleton class="size-12 rounded-full" />
                    <div>
                        <USkeleton class="h-7 w-62.5" />
                        <div class="mt-1 flex gap-2">
                            <USkeleton class="h-6 w-20" />
                            <USkeleton class="h-6 w-20" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid gap-6 sm:gap-8 lg:grid-cols-12">
                <div class="space-y-6 sm:space-y-8 lg:col-span-8">
                    <div class="@container">
                        <USkeleton class="h-83 @max-2xl:h-141.5" />
                    </div>
                    <div class="@container">
                        <USkeleton class="h-44.5 @max-2xl:h-62.5" />
                    </div>
                </div>
                <div class="space-y-6 sm:space-y-8 lg:col-span-4">
                    <div class="@container">
                        <USkeleton class="h-62.75 @max-2xl:h-80.75" />
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
        <template v-else-if="enrollment">
            <div class="mb-6 flex gap-4 max-md:flex-col sm:mb-8 md:items-center">
                <UUser
                    :name="enrollment.athlete.name"
                    :avatar="getAvatar(enrollment.athlete.id.toString(), 150)"
                    :to="`/dashboard/athletes/${enrollment.athlete.id}`"
                    size="3xl"
                >
                    <template #description>
                        <div class="mt-1 flex flex-wrap gap-2">
                            <UBadge
                                variant="soft"
                                color="neutral"
                                :label="`${enrollment.season.startYear} - ${enrollment.season.endYear}`"
                            />
                            <UBadge
                                variant="soft"
                                color="neutral"
                                :label="`${enrollment.activity.name} (${enrollment.course.name})`"
                            />
                        </div>
                    </template>
                </UUser>
            </div>
            <div class="grid gap-6 sm:gap-8 lg:grid-cols-12">
                <div class="space-y-6 sm:space-y-8 lg:col-span-8">
                    <ItemCard :title="$t('card.payments.title')" icon="i-lucide-credit-card">
                        <ItemCardRecord
                            :label="$t('card.payments.record.account_volley')"
                            :value="enrollment.volleyAccount ? formatPrice(enrollment.volleyAccount) : EMPTY_VALUE"
                        />
                        <ItemCardRecord
                            :label="$t('card.payments.record.volley_balance')"
                            :value="enrollment.volleyBalance ? formatPrice(enrollment.volleyBalance) : EMPTY_VALUE"
                        />
                        <ItemCardRecord
                            :label="$t('card.payments.record.volley_balance_secondary')"
                            :value="enrollment.volleyBalanceSecondary
                                ? formatPrice(enrollment.volleyBalanceSecondary)
                                : EMPTY_VALUE"
                        />
                        <ItemCardRecord
                            :label="$t('card.payments.record.first_installment')"
                            :value="enrollment.firstInstallment
                                ? formatPrice(enrollment.firstInstallment)
                                : EMPTY_VALUE"
                        />
                        <ItemCardRecord
                            :label="$t('card.payments.record.second_installment')"
                            :value="enrollment.secondInstallment
                                ? formatPrice(enrollment.secondInstallment)
                                : EMPTY_VALUE"
                        />
                        <ItemCardRecord
                            :label="$t('card.payments.record.third_installment')"
                            :value="enrollment.thirdInstallment
                                ? formatPrice(enrollment.thirdInstallment)
                                : EMPTY_VALUE"
                        />
                    </ItemCard>

                    <ItemCard :title="$t('card.certificate.title')" icon="i-lucide-briefcase-medical">
                        <ItemCardRecord :label="$t('card.certificate.record.expiration_date')" :value="EMPTY_VALUE">
                            <CertificateDate v-if="enrollment.certificateExpirationDate" />
                        </ItemCardRecord>
                        <ItemCardRecord :label="$t('card.certificate.record.download_url')" :value="EMPTY_VALUE">
                            <UButton
                                v-if="enrollment.certificateStorageKey"
                                variant="soft"
                                :label="$t('form.button.download')"
                                icon="i-lucide-download"
                                :to="enrollment.certificateStorageKey"
                                size="xs"
                                target="_blank"
                            />
                        </ItemCardRecord>
                    </ItemCard>
                </div>
                <div class="space-y-6 sm:space-y-8 lg:col-span-4">
                    <ItemCard :title="$t('card.sport.title')" icon="i-lucide-zap">
                        <ItemCardRecord
                            :label="$t('card.sport.record.season')"
                            :value="`${enrollment.season.startYear} - ${enrollment.season.endYear}`"
                        />
                        <ItemCardRecord
                            :label="$t('card.sport.record.activity')"
                            :value="enrollment.activity.name"
                        />
                        <ItemCardRecord
                            :label="$t('card.sport.record.course')"
                            :value="`${enrollment.course.name} ${enrollment.course.description
                                ? `- ${enrollment.course.description}`
                                : ''}`"
                        />
                    </ItemCard>
                </div>
            </div>
        </template>
    </DashboardPanel>
</template>
