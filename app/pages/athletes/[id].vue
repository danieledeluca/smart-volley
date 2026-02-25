<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

const athletesStore = useAthletesStore();
const { currentAthlete: athlete, currentAthletePending: pending } = storeToRefs(athletesStore);

useSeoMeta({
    title: $t('page.athlete.title'),
});

const tableDataColumns: TableColumn<any>[] = [
    {
        accessorKey: 'season',
        header: $t('table.athletes.column.season'),
        cell: ({ row }) => `${row.original.season.starter_year} - ${row.original.season.end_year}`,
    },
    {
        accessorKey: 'activity',
        header: $t('table.athletes.column.activity'),
        cell: ({ row }) => row.original.activity.name,
    },
    {
        accessorKey: 'course',
        header: 'Corso',
        cell: ({ row }) => row.original.course.name,
    },
];
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
                <USkeleton class="h-64" />
            </div>
            <div class="space-y-8 lg:col-span-4">
                <USkeleton class="h-72" />
                <USkeleton class="h-96" />
            </div>
        </div>
    </template>
    <template v-else-if="athlete">
        <UUser
            :name="athlete.name"
            size="3xl"
            :avatar="getAvatar(athlete.id.toString(), 96)"
            class="mb-8"
            :ui="{
                name: 'text-2xl',
            }"
        />
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
                        :value="athlete.tax_code"
                        :showCopyButton="true"
                    />
                </AthleteCard>

                <div>
                    <div class="mb-4">
                        <h2 class="flex items-center gap-3 text-xl">
                            <UButton color="primary" variant="soft" icon="i-lucide-id-card" />
                            <span>Iscrizioni</span>
                        </h2>
                    </div>

                    <UTable
                        v-if="athlete.enrollments.length > 0"
                        :data="athlete.enrollments"
                        :columns="tableDataColumns"
                        class="striped-table max-h-[50dvh] rounded-md border border-accented py-0"
                        sticky
                        :onSelect="(_event, row) => navigateTo(`enrollments/${row.original.id}`)"
                    />
                </div>
            </div>
            <div class="lg:col-span-4">
                <div class="space-y-8 lg:sticky lg:top-[calc(var(--ui-header-height)+var(--spacing)*8)]">
                    <AthleteCard :title="$t('page.athlete.card.address_contacts.title')" icon="i-lucide-notebook">
                        <AthleteRecord :label="$t('page.athlete.record.city')" :value="athlete.city" />
                        <AthleteRecord :label="$t('page.athlete.record.address')" :value="athlete.address" />
                        <AthleteRecord :label="$t('page.athlete.record.phone_number')" :value="athlete.phone_number">
                            <UButton
                                color="primary"
                                variant="ghost"
                                trailingIcon="i-lucide-phone"
                                :to="`tel:${athlete.phone_number}`"
                            />
                            <UButton
                                color="primary"
                                variant="ghost"
                                trailingIcon="i-ic-baseline-whatsapp"
                                :to="`https://api.whatsapp.com/send?phone=${athlete.phone_number}`"
                                target="_blank"
                            />
                        </AthleteRecord>
                        <AthleteRecord v-if="athlete.email" :label="$t('page.athlete.record.email')" :value="athlete.email">
                            <UButton
                                color="primary"
                                variant="ghost"
                                trailingIcon="i-lucide-mail"
                                :to="`mailto:${athlete.email}`"
                            />
                        </AthleteRecord>
                    </AthleteCard>

                    <AthleteCard v-if="athlete.parent" :title="$t('page.athlete.card.parent.title')" icon="i-lucide-user">
                        <AthleteRecord :label="$t('page.athlete.record.parent.name')" :value="athlete.parent.name" />
                        <AthleteRecord
                            :label="$t('page.athlete.record.parent.tax_code')"
                            :value="athlete.parent.tax_code"
                            :showCopyButton="true"
                        />
                        <AthleteRecord
                            v-if="athlete.parent.email"
                            :label="$t('page.athlete.record.parent.email')"
                            :value="athlete.parent.email"
                        >
                            <UButton
                                color="primary"
                                variant="ghost"
                                trailingIcon="i-lucide-mail"
                                :to="`mailto:${athlete.parent.email}`"
                            />
                        </AthleteRecord>
                    </AthleteCard>
                </div>
            </div>
        </div>
    </template>
</template>
