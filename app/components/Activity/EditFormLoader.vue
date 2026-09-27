<script setup lang="ts">
const authStore = useAuthStore();
const { isAdmin } = storeToRefs(authStore);
</script>

<template>
    <div class="grid gap-8">
        <div>
            <div class="space-y-4">
                <div v-if="isAdmin">
                    <USkeleton class="mb-1 h-5 w-1/3" />
                    <div class="flex gap-2">
                        <USkeleton class="h-8 flex-1" />
                        <USkeleton class="size-8" />
                    </div>
                </div>
                <div>
                    <USkeleton class="mb-1 h-5 w-1/3" />
                    <USkeleton class="h-8 w-full" />
                </div>
            </div>
        </div>
    </div>
</template>
