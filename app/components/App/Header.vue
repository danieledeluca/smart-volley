<template>
    <UHeader :toggle="false" :ui="{ right: 'min-w-0 flex-1' }">
        <template #title>
            <AppLogo class="h-8" />
        </template>

        <template #right>
            <UColorModeButton />
            <AuthButton :buttonProps="{ variant: 'ghost', color: 'neutral' }" />
        </template>
    </UHeader>
</template>
