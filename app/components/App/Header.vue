<template>
    <UHeader :toggle="false" class="@container" :ui="{ right: 'max-w-[calc(100%-125px-12px)]' }">
        <template #title>
            <AppLogo class="h-8" />
        </template>

        <template #right>
            <UColorModeButton />
            <AuthButton
                :button="{
                    variant: 'ghost',
                    color: 'neutral',
                    class: 'max-w-[calc(100%-32px-6px)]',
                    ui: {
                        label: '@max-sm:hidden',
                    },
                }"
            />
        </template>
    </UHeader>
</template>
