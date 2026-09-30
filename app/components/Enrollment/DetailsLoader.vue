<script setup lang="ts">
const authStore = useAuthStore();

const { canEdit } = storeToRefs(authStore);
</script>

<template>
    <div class="flex items-start gap-4">
        <div class="flex w-full flex-1 gap-3">
            <USkeleton class="size-12 rounded-full" />
            <div class="flex-1">
                <USkeleton class="h-7 w-full max-w-60" />
                <div class="mt-1 flex gap-2">
                    <USkeleton v-for="n in 2" :key="n" class="h-6 w-full max-w-20" />
                </div>
            </div>
        </div>
        <USkeleton v-if="canEdit" class="ml-auto size-8" />
    </div>
    <div class="details-grid">
        <div class="details-col details-col-main">
            <div class="@container">
                <USkeleton class="h-80 @max-2xl:h-140" />
            </div>
            <div class="@container">
                <USkeleton class="h-44 @max-2xl:h-60" />
            </div>
        </div>
        <div class="details-col details-col-aside">
            <div class="@container">
                <USkeleton class="h-60 @max-2xl:h-80" />
            </div>
        </div>
    </div>
</template>
