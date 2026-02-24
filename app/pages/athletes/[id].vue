<script setup lang="ts">
const athletesStore = useAthletesStore();
const { currentAthlete: athlete, currentAthletePending: pending } = storeToRefs(athletesStore);

useSeoMeta({
    title: $t('page.athlete.title'),
});
</script>

<template>
    <template v-if="pending">
        <div class="mb-8 flex items-start gap-4">
            <USkeleton class="size-12 rounded-full" />
            <div class="grid gap-2">
                <USkeleton class="h-8 w-62.5" />
                <div class="flex gap-2">
                    <USkeleton class="h-6 w-24" />
                    <USkeleton class="h-6 w-24" />
                </div>
            </div>
        </div>
        <div class="grid gap-8 lg:grid-cols-12">
            <div class="space-y-8 lg:col-span-8">
                <USkeleton class="h-64" />
                <USkeleton class="h-48" />
            </div>
            <div class="space-y-8 lg:col-span-4">
                <USkeleton class="h-64" />
                <USkeleton class="h-48" />
            </div>
        </div>
    </template>
    <template v-else-if="athlete">
        <UUser
            :name="athlete.name"
            size="3xl"
            :avatar="getAvatar(athlete.id.toString(), 100)"
            class="mb-8"
            :ui="{
                root: 'items-start',
                name: 'text-2xl mb-2',
            }"
        >
            <template #description>
                <div class="flex flex-wrap gap-2">
                    <UBadge
                        variant="soft"
                        color="neutral"
                        :label="`${athlete.activity.name} (${athlete.course.name})`"
                    />
                    <UBadge
                        variant="soft"
                        color="neutral"
                        :label="`${athlete.season.starterYear} - ${athlete.season.endYear}`"
                    />
                </div>
            </template>
        </UUser>
        <div class="grid gap-8 lg:grid-cols-12">
            <div class="space-y-8 lg:col-span-8">
                <AthleteCard :title="$t('page.athlete.card.athlete.title')" icon="i-lucide-user">
                    <AthleteRecord :label="$t('page.athlete.record.name')" :value="athlete.name" />
                    <AthleteRecord
                        :label="$t('page.athlete.record.birthday')"
                        :value="formatDate(athlete.birthday.toString())"
                    />
                    <AthleteRecord :label="$t('page.athlete.record.birthplace')" :value="athlete.birthplace" />
                    <AthleteRecord
                        :label="$t('page.athlete.record.tax_code')"
                        :value="athlete.taxCode"
                        :showCopyButton="true"
                    />
                </AthleteCard>

                <AthleteCard v-if="athlete.parent" :title="$t('page.athlete.card.parent.title')" icon="i-lucide-user">
                    <AthleteRecord :label="$t('page.athlete.record.parent_name')" :value="athlete.parent.name" />
                    <AthleteRecord
                        :label="$t('page.athlete.record.parent_tax_code')"
                        :value="athlete.parent.taxCode"
                        :showCopyButton="true"
                    />
                </AthleteCard>

                <AthleteCard :title="$t('page.athlete.card.address_contacts.title')" icon="i-lucide-notebook">
                    <AthleteRecord :label="$t('page.athlete.record.city')" :value="athlete.city" />
                    <AthleteRecord :label="$t('page.athlete.record.address')" :value="athlete.address" />
                    <AthleteRecord :label="$t('page.athlete.record.phone_number')" :value="athlete.phoneNumber">
                        <UButton
                            color="primary"
                            variant="ghost"
                            trailingIcon="i-lucide-phone"
                            :to="`tel:${athlete.phoneNumber}`"
                        />
                        <UButton
                            color="primary"
                            variant="ghost"
                            trailingIcon="i-ic-baseline-whatsapp"
                            :to="`https://api.whatsapp.com/send?phone=${athlete.phoneNumber}`"
                            target="_blank"
                        />
                    </AthleteRecord>
                    <AthleteRecord :label="$t('page.athlete.record.email')" :value="athlete.email">
                        <UButton
                            color="primary"
                            variant="ghost"
                            trailingIcon="i-lucide-mail"
                            :to="`mailto:${athlete.email}`"
                        />
                    </AthleteRecord>
                </AthleteCard>

                <AthleteCard :title="$t('page.athlete.card.certificate.title')" icon="i-lucide-file">
                    <AthleteRecord
                        :label="$t('page.athlete.record.certificate_expiration_date')"
                        :value="formatDate(athlete.certificateExpirationDate?.toString())"
                    />
                    <AthleteRecord
                        :label="$t('page.athlete.record.certificate_download_url')"
                        :value="athlete.certificateDownloadUrl || EMPTY_VALUE"
                    />
                </AthleteCard>
            </div>
            <div class="lg:col-span-4">
                <div class="space-y-8 lg:sticky lg:top-[calc(var(--ui-header-height)+var(--spacing)*8)]">
                    <AthleteCard :title="$t('page.athlete.card.sport.title')" icon="i-lucide-volleyball">
                        <AthleteRecord
                            :label="$t('page.athlete.record.season')"
                            :value="`${athlete.season.starterYear} - ${athlete.season.endYear}`"
                        />
                        <AthleteRecord :label="$t('page.athlete.record.activity')" :value="athlete.activity.name" />
                        <AthleteRecord :label="$t('page.athlete.record.course')" :value="athlete.course.name" />
                    </AthleteCard>

                    <AthleteCard :title="$t('page.athlete.card.payments.title')" icon="i-lucide-credit-card">
                        <AthleteRecord
                            :label="$t('page.athlete.record.volley_account')"
                            :value="formatPrice(athlete.volleyAccount?.toString())"
                        />
                        <AthleteRecord
                            :label="$t('page.athlete.record.volley_balance')"
                            :value="formatPrice(athlete.volleyBalance?.toString())"
                        />
                        <AthleteRecord
                            :label="$t('page.athlete.record.volley_balance_second')"
                            :value="formatPrice(athlete.volleyBalanceSecondary?.toString())"
                        />
                        <AthleteRecord
                            :label="$t('page.athlete.record.first_installment')"
                            :value="formatPrice(athlete.firstInstallment?.toString())"
                        />
                        <AthleteRecord
                            :label="$t('page.athlete.record.second_installment')"
                            :value="formatPrice(athlete.secondInstallment?.toString())"
                        />
                        <AthleteRecord
                            :label="$t('page.athlete.record.third_installment')"
                            :value="formatPrice(athlete.thirdInstallment?.toString())"
                        />
                    </AthleteCard>
                </div>
            </div>
        </div>
    </template>
</template>
