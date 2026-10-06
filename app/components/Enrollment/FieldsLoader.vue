<template>
    <div class="grid gap-8">
        <div v-for="n in 3" :key="n">
            <div class="mb-6.25 flex gap-3">
                <USkeleton class="size-8" />
                <USkeleton class="h-8 max-w-1/2 flex-1" />
            </div>
            <div class="space-y-4">
                <div>
                    <div class="flex gap-2">
                        <USkeleton class="h-8 flex-1" />
                        <USkeleton class="size-8" />
                    </div>
                    <USkeleton class="mt-2 h-8 w-full" />
                </div>
            </div>
        </div>
        <div>
            <div class="mb-6.25 flex gap-3">
                <USkeleton class="size-8" />
                <USkeleton class="h-8 max-w-1/2 flex-1" />
            </div>
            <div class="space-y-4">
                <template v-for="n in 3" :key="n">
                    <div v-for="m in 2" :key="m">
                        <USkeleton class="h-5 w-1/3" />
                        <USkeleton class="mt-1 h-8 w-full" />
                    </div>
                    <div :class="n < 3 ? 'pb-4.75' : ''">
                        <USkeleton class="h-5 w-1/3" />
                        <USkeleton class="mt-1 h-12.5 w-full" />
                    </div>
                </template>
            </div>
        </div>
        <div>
            <div class="mb-6.25 flex gap-3">
                <USkeleton class="size-8" />
                <USkeleton class="h-8 max-w-1/2 flex-1" />
            </div>
            <div class="space-y-4">
                <div>
                    <USkeleton class="h-47 w-full" />
                    <USkeleton class="mt-2 h-10 w-full" />
                </div>
                <div>
                    <USkeleton class="h-5 w-1/3" />
                    <USkeleton class="mt-1 h-8 w-full" />
                </div>
            </div>
        </div>
    </div>
</template>
