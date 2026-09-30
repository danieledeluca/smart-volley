<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
    <div class="grid gap-8">
        <div>
            <div class="space-y-4">
                <div v-for="n in 2" :key="n">
                    <USkeleton class="mb-1 h-5 w-1/3" />
                    <USkeleton class="h-8 w-full" />
                </div>
            </div>
        </div>
        <div>
            <div class="mb-6.25 flex gap-3">
                <USkeleton class="size-8" />
                <USkeleton class="h-8 max-w-1/2 flex-1" />
            </div>
            <div class="space-y-4">
                <div>
                    <USkeleton class="h-12.5 w-full" />
                    <USkeleton v-if="authStore.isAdmin" class="mt-2 h-8 w-full" />
                </div>
            </div>
        </div>
    </div>
</template>
