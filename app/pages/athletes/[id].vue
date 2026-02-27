<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

useSeoMeta({
    title: $t('page.athlete.title'),
});

const route = useRoute();

const { data: athlete, pending } = useLazyFetch<AthleteItem>(`/api/athletes/${route.params.id}`);

const tableColumns: TableColumn<AthleteItem['enrollments'][number]>[] = [
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
        <div class="mb-8 flex gap-3">
            <USkeleton class="size-12 rounded-full" />
            <div>
                <USkeleton class="h-7 w-62.5" />
                <div class="mt-1 flex gap-2">
                    <USkeleton class="h-6 w-11" />
                </div>
            </div>
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
    <template v-else-if="athlete">
        <UUser
            :name="athlete.name"
            size="3xl"
            :avatar="getAvatar(athlete.id.toString(), 96)"
            class="mb-8"
        >
            <template #description>
                <div class="mt-1 flex flex-wrap gap-2">
                    <UBadge variant="soft" color="neutral">
                        #{{ athlete.id }}
                    </UBadge>
                </div>
            </template>
        </UUser>
        <div class="grid gap-8 lg:grid-cols-12">
            <div class="space-y-8 lg:col-span-8">
                <ItemCard :title="$t('page.athlete.card.athlete.title')" icon="i-lucide-user">
                    <ItemCardRecord :label="$t('page.athlete.record.name')" :value="athlete.name" />
                    <ItemCardRecord
                        :label="$t('page.athlete.record.birthday')"
                        :value="formatDate(athlete.birthday.toString())"
                    />
                    <ItemCardRecord :label="$t('page.athlete.record.birthplace')" :value="athlete.birthplace" />
                    <ItemCardRecord
                        :label="$t('page.athlete.record.tax_code')"
                        :value="athlete.tax_code"
                        :showCopyButton="true"
                    />
                </ItemCard>

                <ItemCard
                    v-if="athlete.enrollments.length > 0"
                    title="Iscrizioni"
                    icon="i-lucide-history"
                    :removePadding="true"
                >
                    <ListTable
                        :tableData="athlete.enrollments"
                        :tableColumns
                        :isLoading="pending"
                        class="col-span-2 mt-0! min-w-0 **:data-[slot=root]:rounded-t-none"
                        :onSelect="(_event, row) => navigateTo(`/enrollments/${row.original.id}`)"
                    />
                </ItemCard>
            </div>
            <div class="lg:col-span-4">
                <div class="space-y-8 lg:sticky lg:top-[calc(var(--ui-header-height)+var(--spacing)*8)]">
                    <ItemCard :title="$t('page.athlete.card.address_contacts.title')" icon="i-lucide-notebook">
                        <ItemCardRecord :label="$t('page.athlete.record.city')" :value="athlete.city" />
                        <ItemCardRecord :label="$t('page.athlete.record.address')" :value="athlete.address" />
                        <ItemCardRecord :label="$t('page.athlete.record.phone_number')" :value="athlete.phone_number">
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
                        </ItemCardRecord>
                        <ItemCardRecord
                            v-if="athlete.email"
                            :label="$t('page.athlete.record.email')"
                            :value="athlete.email"
                        >
                            <UButton
                                color="primary"
                                variant="ghost"
                                trailingIcon="i-lucide-mail"
                                :to="`mailto:${athlete.email}`"
                            />
                        </ItemCardRecord>
                    </ItemCard>

                    <ItemCard
                        v-if="athlete.parent"
                        :title="$t('page.athlete.card.parent.title')"
                        icon="i-lucide-user"
                    >
                        <ItemCardRecord :label="$t('page.athlete.record.parent.name')" :value="athlete.parent.name" />
                        <ItemCardRecord
                            :label="$t('page.athlete.record.parent.tax_code')"
                            :value="athlete.parent.tax_code"
                            :showCopyButton="true"
                        />
                        <ItemCardRecord
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
                        </ItemCardRecord>
                    </ItemCard>
                </div>
            </div>
        </div>
    </template>
</template>
