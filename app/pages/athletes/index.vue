<script setup lang="ts">
import type { CommandPaletteGroup, CommandPaletteItem } from '@nuxt/ui';

const athletesStore = useAthletesStore();
const { athletes, athletesPending } = storeToRefs(athletesStore);

const searchTerm = ref('');
const groups = computed<CommandPaletteGroup[]>(() => [{
    id: 'athletes',
    label: searchTerm.value ? `Athletes matching “${searchTerm.value}”...` : 'Athletes',
    items: athletes.value?.map<CommandPaletteItem>((athlete) => {
        return {
            id: athlete.id,
            label: athlete.name,
            icon: 'i-lucide-user',
            onSelect() {
                navigateTo(`/athletes/${athlete.id}`);
            },
        };
    }),
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
                :loading="athletesPending"
                :groups="groups"
                placeholder="Search athletes..."
                class="h-80"
            />
        </template>
    </UModal>
</template>
