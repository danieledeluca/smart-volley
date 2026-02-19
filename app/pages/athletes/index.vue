<script setup lang="ts">
import type { CommandPaletteGroup, CommandPaletteItem } from '@nuxt/ui';
import type { Athlete } from '~~/lib/db/generated/prisma/client';

const { data: athletes, status } = await useFetch('/api/athletes', {
    key: 'command-palette-athletes',
    transform: (data: Partial<Athlete>[]): CommandPaletteItem[] => {
        return data?.map((athlete) => ({
            id: athlete.id,
            label: athlete.name,
            icon: 'i-lucide-user',
            onSelect() {
                navigateTo(`/athletes/${athlete.id}`);
            },
        }));
    },
    lazy: true,
});

const searchTerm = ref('');
const groups = computed<CommandPaletteGroup[]>(() => [{
    id: 'athletes',
    label: searchTerm.value ? `Athletes matching “${searchTerm.value}”...` : 'Athletes',
    items: athletes.value,
}]);
</script>

<template>
    <UModal>
        <div class="flex h-full justify-center">
            <UButton
                label="Search athletes..."
                color="neutral"
                variant="subtle"
                icon="i-lucide-search"
                size="xl"
            />
        </div>

        <template #content>
            <UCommandPalette
                v-model:searchTerm="searchTerm"
                :loading="status === 'pending'"
                :groups="groups"
                placeholder="Search athletes..."
                class="h-80"
            />
        </template>
    </UModal>
</template>
