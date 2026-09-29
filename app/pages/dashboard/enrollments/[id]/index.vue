<script setup lang="ts">
const authStore = useAuthStore();
const enrollmentsStore = useEnrollmentsStore();

const { canEdit } = storeToRefs(authStore);
const {
    currentEnrollment: enrollment,
    currentEnrollmentPending: pending,
    currentEnrollmentError: error,
} = storeToRefs(enrollmentsStore);

const title = computed(() => enrollment.value?.athlete.name || $t('page.enrollment.title'));

useSeoMeta({ title });

const enrollmentPaymentsTableColumns = getEnrollmentPaymentsTableColumns(['name', 'amount', 'date', 'type']);

onMounted(async () => {
    await nextTick();
    enrollmentsStore.refreshCurrentEnrollment();
});
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
            <div class="flex items-start gap-4">
                <div class="flex w-full flex-1 gap-3">
                    <USkeleton class="size-12 rounded-full" />
                    <div class="flex-1">
                        <USkeleton class="h-7 w-full max-w-60" />
                        <div class="mt-1 flex gap-2">
                            <USkeleton class="h-6 w-full max-w-20" />
                            <USkeleton class="h-6 w-full max-w-20" />
                        </div>
                    </div>
                </div>
                <USkeleton v-if="canEdit" class="ml-auto size-8" />
            </div>
            <div class="grid gap-4 sm:gap-6 lg:grid-cols-12">
                <div class="space-y-4 sm:space-y-6 lg:col-span-8">
                    <div class="@container">
                        <USkeleton class="h-80 @max-2xl:h-140" />
                    </div>
                    <div class="@container">
                        <USkeleton class="h-44 @max-2xl:h-60" />
                    </div>
                </div>
                <div class="space-y-4 sm:space-y-6 lg:col-span-4">
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
        <template v-else-if="enrollment">
            <div class="flex items-start gap-4">
                <AppUser
                    :userProps="{
                        name: enrollment.athlete.name,
                        size: '3xl',
                        to: `/dashboard/athletes/${enrollment.athlete.id}`,
                    }"
                    :avatarSize="96"
                >
                    <template #description>
                        <span class="mt-1 flex flex-wrap gap-2">
                            <UBadge
                                variant="soft"
                                color="neutral"
                                :label="`${enrollment.season.startYear} - ${enrollment.season.endYear}`"
                            />
                            <UBadge
                                variant="soft"
                                color="neutral"
                                :label="`${enrollment.activity.name} (${enrollment.course.code})`"
                            />
                        </span>
                    </template>
                </AppUser>
                <div v-if="canEdit" class="ml-auto">
                    <EnrollmentActions
                        :enrollmentId="enrollment.id"
                        @deleteComplete="navigateTo('/dashboard/enrollments')"
                        @editClose="(id) => id ? enrollmentsStore.refreshCurrentEnrollment() : undefined"
                    />
                </div>
            </div>
            <div class="grid gap-4 sm:gap-6 lg:grid-cols-12">
                <div class="space-y-4 sm:space-y-6 lg:col-span-8">
                    <ItemCard :title="$t('card.payments.title')" icon="i-lucide-badge-euro">
                        <ListTable :tableData="enrollment.payments" :tableColumns="enrollmentPaymentsTableColumns" />
                    </ItemCard>

                    <ItemCard :title="$t('card.certificate.title')" icon="i-lucide-briefcase-medical">
                        <ItemCardRecord :label="$t('card.certificate.record.expiration_date')">
                            <CertificateDate
                                v-if="enrollment.certificateExpirationDate"
                                :date="enrollment.certificateExpirationDate"
                            />
                        </ItemCardRecord>
                        <ItemCardRecord :label="$t('card.certificate.record.download_url')">
                            <CertificateDownloadButton
                                v-if="enrollment.certificateFile"
                                :enrollmentId="enrollment.id"
                                :buttonProps="{ size: 'xs' }"
                            />
                        </ItemCardRecord>
                    </ItemCard>
                </div>
                <div class="space-y-4 sm:space-y-6 lg:col-span-4">
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
                            :value="`${enrollment.course.code} ${enrollment.course.name
                                ? `- ${enrollment.course.name}`
                                : ''}`"
                        />
                    </ItemCard>
                </div>
            </div>
        </template>
    </DashboardPanel>
</template>
