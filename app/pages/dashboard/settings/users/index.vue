<script setup lang="ts">
useSeoMeta({
    title: $t('page.settings.users.title'),
});

const usersStore = useUsersStore();

const { users, usersPending, usersError } = storeToRefs(usersStore);

const q = ref('');

const filteredUsers = computed(() => {
    return users.value?.filter((user) => user.name.toLowerCase().includes(q.value.toLowerCase()));
});
</script>

<template>
    <DashboardPanel :title="$t('page.settings.users.title')">
        <template #toolbar>
            <SettingsMenu />
        </template>
        <div class="mx-auto flex w-full flex-col gap-4 sm:gap-6 lg:max-w-2xl lg:gap-12">
            <div>
                <UPageCard
                    :title="$t('page.settings.users.card.title')"
                    :description="$t('page.settings.users.card.description')"
                    variant="naked"
                    class="mb-4"
                />
                <UPageCard
                    variant="subtle"
                    :ui="{
                        container: 'p-0 sm:p-0 gap-y-0 min-w-0',
                        wrapper: 'items-stretch',
                        header: 'p-4 mb-0',
                    }"
                >
                    <template #header>
                        <UInput
                            v-model="q"
                            class="w-full"
                            :placeholder="$t('page.settings.users.filter.placeholder')"
                            icon="i-lucide-search"
                            autofocus
                        />
                    </template>
                    <template v-if="usersPending && !users">
                        <div v-for="n in 3" :key="n" class="flex items-center justify-between gap-3 border-t border-default px-4 py-3 sm:px-6">
                            <div class="flex flex-1 items-center gap-3">
                                <USkeleton class="size-8 rounded-full" />
                                <div class="flex-1">
                                    <USkeleton class="h-4 w-full max-w-32" />
                                    <USkeleton class="mt-1 h-4 w-full max-w-24" />
                                </div>
                            </div>
                            <USkeleton class="h-8 w-full max-w-48" />
                        </div>
                    </template>
                    <div v-else-if="!usersError && filteredUsers">
                        <SettingsUser v-for="user in filteredUsers" :key="user.id" :user />
                    </div>
                </UPageCard>
                <div v-if="!usersPending" class="mt-4">
                    <UAlert
                        v-if="usersError"
                        :title="getApiError(usersError)"
                        color="error"
                        icon="i-lucide-circle-x"
                    />
                    <UAlert
                        v-if="filteredUsers && filteredUsers.length === 0"
                        :title="$t('page.settings.users.no_data', { name: q })"
                        color="warning"
                        icon="i-lucide-triangle-alert"
                    />
                </div>
            </div>
        </div>
    </DashboardPanel>
</template>
