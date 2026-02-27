<script setup lang="ts">
useSeoMeta({
    title: 'Dettaglio iscrizione',
});

const route = useRoute();

const { data: enrollment, pending } = useFetch(`/api/enrollments/${route.params.id}`, {
    lazy: true,
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
            <USkeleton class="h-8 w-40 max-md:w-full md:ml-auto" />
        </div>
        <div class="grid gap-8 lg:grid-cols-12">
            <div class="space-y-8 lg:col-span-8">
                <div class="@container">
                    <USkeleton class="h-62.5 @max-2xl:h-97" />
                </div>
                <div class="@container">
                    <USkeleton class="h-110 @max-2xl:h-119" />
                </div>
            </div>
            <div class="space-y-8 lg:col-span-4">
                <div class="@container">
                    <USkeleton class="h-62.75 @max-2xl:h-101" />
                </div>
                <div class="@container">
                    <USkeleton class="h-62.75 @max-2xl:h-80.75" />
                </div>
            </div>
        </div>
    </template>
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
                        >
                            #{{ enrollment.id }}
                        </UBadge>
                        <UBadge
                            variant="soft"
                            color="neutral"
                        >
                            {{ enrollment.season.starter_year }} - {{ enrollment.season.end_year }}
                        </UBadge>
                        <UBadge
                            variant="soft"
                            color="neutral"
                        >
                            {{ enrollment.activity.name }} ({{ enrollment.course.name }})
                        </UBadge>
                    </div>
                </template>
            </UUser>
            <UButton
                trailingIcon="i-lucide-arrow-right"
                class="max-md:w-full max-md:justify-center md:ml-auto"
                :to="`/athletes/${enrollment.athlete.id}`"
            >
                Vedi scheda atleta
            </UButton>
        </div>
        <div class="grid gap-8 lg:grid-cols-12">
            <div class="space-y-8 lg:col-span-8">
                <ItemCard title="Pagamenti" icon="i-lucide-credit-card">
                    <ItemCardRecord label="Account volley" :value="formatPrice(enrollment.volley_account)" />
                    <ItemCardRecord label="Saldo volley" :value="formatPrice(enrollment.volley_balance)" />
                    <ItemCardRecord label="Saldo volley 2" :value="formatPrice(enrollment.volley_balance_secondary)" />
                    <ItemCardRecord label="Prima rata" :value="formatPrice(enrollment.first_installment)" />
                    <ItemCardRecord label="Seconda rata" :value="formatPrice(enrollment.second_installment)" />
                    <ItemCardRecord label="Terza rata" :value="formatPrice(enrollment.third_installment)" />
                </ItemCard>
                <ItemCard title="Certificato" icon="i-lucide-briefcase-medical">
                    <ItemCardRecord
                        label="Scadenza certificato"
                        :value="formatDate(enrollment.certificate_expiration_date)"
                    />
                    <ItemCardRecord
                        label="Download certificato"
                        :value="enrollment.certificate_download_url || EMPTY_VALUE"
                    />
                </ItemCard>
            </div>
            <div class="lg:col-span-4">
                <div class="space-y-8 lg:sticky lg:top-[calc(var(--ui-header-height)+var(--spacing)*8)]">
                    <ItemCard title="Sport" icon="i-lucide-zap">
                        <ItemCardRecord
                            label="Stagione"
                            :value="`${enrollment.season.starter_year} - ${enrollment.season.end_year}`"
                        />
                        <ItemCardRecord label="Attività" :value="enrollment.activity.name" />
                        <ItemCardRecord label="Corso" :value="enrollment.course.name" />
                    </ItemCard>
                </div>
            </div>
        </div>
    </template>
</template>
