<script setup lang="ts">
useSeoMeta({
    title: $t('page.enrollment.title'),
});

const route = useRoute();

const { data: enrollment, pending, error } = useLazyFetch(`/api/enrollments/${route.params.id}`, {
    headers: useRequestHeaders(['cookie']),
});
</script>

<template>
    <template v-if="pending">
        <div class="mb-8 flex gap-4 max-md:flex-col md:items-center">
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
            <div class="flex flex-wrap gap-4 md:ml-auto">
                <USkeleton class="h-8 w-full max-md:w-full md:w-50" />
                <USkeleton class="h-8 w-full max-md:w-full md:w-40" />
            </div>
        </div>
        <div class="grid gap-8 lg:grid-cols-12">
            <div class="space-y-8 lg:col-span-8">
                <div class="@container">
                    <USkeleton class="h-83 @max-2xl:h-141.5" />
                </div>
                <div class="@container">
                    <USkeleton class="h-44.5 @max-2xl:h-62.5" />
                </div>
            </div>
            <div class="space-y-8 lg:col-span-4">
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
        <div class="mb-8 flex gap-4 max-md:flex-col md:items-center">
            <UUser
                :name="enrollment.athlete.name"
                :avatar="getAvatar(enrollment.athlete.id.toString(), 150)"
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
            <div class="flex flex-wrap gap-4 md:ml-auto">
                <UButton
                    icon="i-lucide-arrow-left"
                    class="max-md:w-full max-md:justify-center"
                    to="/enrollments"
                    :label="$t('page.enrollment.button.back')"
                    variant="soft"
                />
                <UButton
                    trailingIcon="i-lucide-arrow-right"
                    class="max-md:w-full max-md:justify-center"
                    :to="`/athletes/${enrollment.athlete.id}`"
                    :label="$t('page.enrollment.button.athlete')"
                />
            </div>
        </div>
        <div class="grid gap-8 lg:grid-cols-12">
            <div class="space-y-8 lg:col-span-8">
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
                        :value="enrollment.firstInstallment ? formatPrice(enrollment.firstInstallment) : EMPTY_VALUE"
                    />
                    <ItemCardRecord
                        :label="$t('card.payments.record.second_installment')"
                        :value="enrollment.secondInstallment ? formatPrice(enrollment.secondInstallment) : EMPTY_VALUE"
                    />
                    <ItemCardRecord
                        :label="$t('card.payments.record.third_installment')"
                        :value="enrollment.thirdInstallment ? formatPrice(enrollment.thirdInstallment) : EMPTY_VALUE"
                    />
                </ItemCard>
                <ItemCard :title="$t('card.certificate.title')" icon="i-lucide-briefcase-medical">
                    <ItemCardRecord
                        :label="$t('card.certificate.record.expiration_date')"
                        :value="enrollment.certificateExpirationDate
                            ? formatDate(enrollment.certificateExpirationDate)
                            : EMPTY_VALUE"
                    />
                    <ItemCardRecord
                        :label="$t('card.certificate.record.download_url')"
                        :value="enrollment.certificateStorageKey || EMPTY_VALUE"
                    >
                        <template v-if="enrollment.certificateStorageKey">
                            <UButton
                                variant="ghost"
                                icon="i-lucide-download"
                                :to="enrollment.certificateStorageKey"
                            />
                        </template>
                    </ItemCardRecord>
                </ItemCard>
            </div>
            <div class="lg:col-span-4">
                <div class="space-y-8 lg:sticky lg:top-[calc(var(--ui-header-height)+var(--spacing)*8)]">
                    <ItemCard :title="$t('card.sport.title')" icon="i-lucide-zap">
                        <ItemCardRecord
                            :label="$t('card.sport.record.season')"
                            :value="`${enrollment.season.startYear} - ${enrollment.season.endYear}`"
                        />
                        <ItemCardRecord :label="$t('card.sport.record.activity')" :value="enrollment.activity.name" />
                        <ItemCardRecord
                            :label="$t('card.sport.record.course')"
                            :value="`${enrollment.course.name} ${enrollment.course.description
                                ? `- ${enrollment.course.description}`
                                : ''}`"
                        />
                    </ItemCard>
                </div>
            </div>
        </div>
    </template>
</template>
