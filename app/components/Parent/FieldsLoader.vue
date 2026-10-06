<template>
    <div class="grid gap-8">
        <div v-for="n in 2" :key="n">
            <div class="mb-6.25 flex gap-3">
                <USkeleton class="size-8" />
                <USkeleton class="h-8 max-w-1/2 flex-1" />
            </div>
            <div class="space-y-4">
                <div v-for="m in 2" :key="m">
                    <USkeleton class="h-5 w-1/3" />
                    <USkeleton class="mt-1 h-8 w-full" />
                </div>
            </div>
        </div>
    </div>
</template>
