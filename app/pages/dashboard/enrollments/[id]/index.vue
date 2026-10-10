<script setup lang="ts">
const route = useRoute();
const { data: enrollment, pending, error, refresh } = useLazyFetch(`/api/enrollments/${route.params.id}`);

const title = computed(() => enrollment.value?.athlete.name || $t('page.enrollment.title'));

useSeoMeta({ title });

const enrollmentPaymentsTableColumns = getEnrollmentPaymentsTableColumns(['name', 'amount', 'date', 'type']);
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
        <EnrollmentDetailsLoader v-if="pending && !enrollment" />
        <UAlert
            v-else-if="error"
            :title="getApiError(error)"
            color="error"
            icon="i-lucide-circle-x"
        />
        <template v-else-if="enrollment">
            <PageUser
                :name="enrollment.athlete.name"
                :link="`/dashboard/athletes/${enrollment.athlete.id}`"
                :badgeLabels="[
                    `${enrollment.season.startYear} - ${enrollment.season.endYear}`,
                    `${enrollment.activity.name} (${enrollment.course.code})`,
                ]"
            >
                <EnrollmentActions
                    :enrollmentId="enrollment.id"
                    @deleteComplete="navigateTo('/dashboard/enrollments')"
                    @editClose="$event ? refresh() : undefined"
                />
            </PageUser>
            <div class="details-grid">
                <div class="details-col details-col-main">
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
                <div class="details-col details-col-aside">
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
                            :value="`${enrollment.course.code} - ${enrollment.course.name}`"
                        />
                    </ItemCard>
                </div>
            </div>
        </template>
    </DashboardPanel>
</template>
