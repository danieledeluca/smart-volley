<template>
    <div class="flex h-full flex-col items-center justify-center text-center">
        <NuxtImg src="no-data.svg" class="max-w-40" :alt="$t('page.error.no_data.title')" />
        <div class="mt-2 text-4xl font-bold text-balance text-highlighted sm:text-5xl">
            {{ $t('page.error.no_data.title') }}
        </div>
        <p class="mt-4 text-lg text-balance text-muted">
            {{ $t('page.error.no_data.description') }}
        </p>
    </div>
</template>
