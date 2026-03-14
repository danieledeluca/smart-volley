<script setup lang="ts">
useSeoMeta({
    title: $t('page.enrollment.title'),
});

const route = useRoute();

const { data: enrollment, pending, error } = useLazyFetch<EnrollmentItem>(`/api/enrollments/${route.params.id}`, {
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
                        <USkeleton class="h-6 w-11" />
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
                            :label="`#${enrollment.id}`"
                        />
                        <UBadge
                            variant="soft"
                            color="neutral"
                            :label="`${enrollment.season.starter_year} - ${enrollment.season.end_year}`"
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
                        :label="$t('card.record.account_volley')"
                        :value="formatPrice(enrollment.volley_account)"
                    />
                    <ItemCardRecord
                        :label="$t('card.record.volley_balance')"
                        :value="formatPrice(enrollment.volley_balance)"
                    />
                    <ItemCardRecord
                        :label="$t('card.record.volley_balance_secondary')"
                        :value="formatPrice(enrollment.volley_balance_secondary)"
                    />
                    <ItemCardRecord
                        :label="$t('card.record.first_installment')"
                        :value="formatPrice(enrollment.first_installment)"
                    />
                    <ItemCardRecord
                        :label="$t('card.record.second_installment')"
                        :value="formatPrice(enrollment.second_installment)"
                    />
                    <ItemCardRecord
                        :label="$t('card.record.third_installment')"
                        :value="formatPrice(enrollment.third_installment)"
                    />
                </ItemCard>
                <ItemCard title="Certificato" icon="i-lucide-briefcase-medical">
                    <ItemCardRecord
                        :label="$t('card.record.certificates.expiration_date')"
                        :value="formatDate(enrollment.certificate_expiration_date?.toString())"
                    />
                    <ItemCardRecord
                        :label="$t('card.record.certificates.download_url')"
                        :value="enrollment.certificate_download_url
                            ? `${enrollment.athlete.name}
                                (${enrollment.season.starter_year}-${enrollment.season.end_year})`
                            : EMPTY_VALUE"
                    >
                        <template v-if="enrollment.certificate_download_url">
                            <UButton
                                variant="ghost"
                                icon="i-lucide-download"
                                :to="enrollment.certificate_download_url"
                            />
                        </template>
                    </ItemCardRecord>
                </ItemCard>
            </div>
            <div class="lg:col-span-4">
                <div class="space-y-8 lg:sticky lg:top-[calc(var(--ui-header-height)+var(--spacing)*8)]">
                    <ItemCard :title="$t('card.sport.title')" icon="i-lucide-zap">
                        <ItemCardRecord
                            :label="$t('card.record.season')"
                            :value="`${enrollment.season.starter_year} - ${enrollment.season.end_year}`"
                        />
                        <ItemCardRecord :label="$t('card.record.activity')" :value="enrollment.activity.name" />
                        <ItemCardRecord :label="$t('card.record.course')" :value="enrollment.course.name" />
                    </ItemCard>
                </div>
            </div>
        </div>
    </template>
</template>
