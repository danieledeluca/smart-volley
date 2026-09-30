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
    </div>
</template>
