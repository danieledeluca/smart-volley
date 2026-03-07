<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

useSeoMeta({
    title: $t('page.athlete.title'),
});

const route = useRoute();

const { data: athlete, pending, error } = useLazyFetch<AthleteItem>(`/api/athletes/${route.params.id}`, {
    headers: useRequestHeaders(['cookie']),
});

const tableColumns: TableColumn<AthleteItem['enrollments'][number]>[] = [
    {
        accessorKey: 'season',
        header: $t('table.column.season'),
        cell: ({ row }) => `${row.original.season.starter_year} - ${row.original.season.end_year}`,
    },
    {
        accessorKey: 'activity',
        header: $t('table.column.activity'),
        cell: ({ row }) => row.original.activity.name,
    },
    {
        accessorKey: 'course',
        header: $t('table.column.course'),
        cell: ({ row }) => row.original.course.name,
    },
];
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
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap gap-4 md:ml-auto">
                <USkeleton class="h-8 w-full max-md:w-full md:w-50" />
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
    <AppError v-else-if="error" :error />
    <template v-else-if="athlete">
        <div class="mb-8 flex gap-4 max-md:flex-col md:items-center">
            <UUser
                :name="athlete.name"
                size="3xl"
                :avatar="getAvatar(athlete.id.toString(), 96)"
            >
                <template #description>
                    <div class="mt-1 flex flex-wrap gap-2">
                        <UBadge variant="soft" color="neutral" :label="`#${athlete.id}`" />
                    </div>
                </template>
            </UUser>
            <div class="flex flex-wrap gap-4 md:ml-auto">
                <UButton
                    icon="i-lucide-arrow-left"
                    class="max-md:w-full max-md:justify-center"
                    to="/athletes"
                    label="Torna alla lista degli atleti"
                    variant="soft"
                />
            </div>
        </div>
        <div class="grid gap-8 lg:grid-cols-12">
            <div class="space-y-8 lg:col-span-8">
                <ItemCard :title="$t('card.athlete.title')" icon="i-lucide-user">
                    <ItemCardRecord :label="$t('card.record.name')" :value="athlete.name" />
                    <ItemCardRecord
                        :label="$t('card.record.birthday')"
                        :value="formatDate(athlete.birthday.toString())"
                    />
                    <ItemCardRecord :label="$t('card.record.birthplace')" :value="athlete.birthplace" />
                    <ItemCardRecord
                        :label="$t('card.record.tax_code')"
                        :value="athlete.tax_code"
                        :showCopyButton="true"
                    />
                </ItemCard>

                <ItemCard
                    :title="$t('card.enrollments.title')"
                    icon="i-lucide-history"
                    class="**:data-[slot=body]:p-0"
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
                    <ItemCard :title="$t('card.address_contacts.title')" icon="i-lucide-notebook">
                        <ItemCardRecord :label="$t('card.record.city')" :value="athlete.city" />
                        <ItemCardRecord :label="$t('card.record.address')" :value="athlete.address" />
                        <ItemCardRecord
                            :label="$t('card.record.phone_number')"
                            :value="athlete.phone_number"
                            :showPhoneNumberButtons="true"
                        />
                        <ItemCardRecord
                            v-if="athlete.email"
                            :label="$t('card.record.email')"
                            :value="athlete.email"
                            :showEmailButton="true"
                        />
                    </ItemCard>

                    <ItemCard
                        v-if="athlete.parent"
                        :title="$t('card.parent.title')"
                        icon="i-lucide-user"
                    >
                        <ItemCardRecord :label="$t('card.record.parent.name')" :value="athlete.parent.name" />
                        <ItemCardRecord
                            :label="$t('card.record.parent.tax_code')"
                            :value="athlete.parent.tax_code"
                            :showCopyButton="true"
                        />
                        <ItemCardRecord
                            :label="$t('card.record.phone_number')"
                            :value="athlete.parent.phone_number"
                            :showPhoneNumberButtons="true"
                        />
                        <ItemCardRecord
                            v-if="athlete.parent.email"
                            :label="$t('card.record.parent.email')"
                            :value="athlete.parent.email"
                            :showEmailButton="true"
                        />
                    </ItemCard>
                </div>
            </div>
        </div>
    </template>
</template>
