<template>
    <div class="flex h-full flex-col items-center justify-center text-center">
        <NuxtImg src="no-data.svg" class="max-w-40" />
        <h1 class="mt-2 text-4xl font-bold text-balance text-highlighted sm:text-5xl">
            {{ $t('page.error.no_data.title') }}
        </h1>
        <p class="mt-4 text-lg text-balance text-muted">
            {{ $t('page.error.no_data.description') }}
        </p>
    </div>
</template>
