<template>
    <UHeader :toggle="false" :ui="{ right: 'max-w-[calc(100%-125px-12px)]' }">
        <template #title>
            <AppLogo class="h-8" />
        </template>

        <template #right>
            <UColorModeButton />
            <AuthButton
                :buttonProps="{
                    variant: 'ghost',
                    color: 'neutral',
                    class: 'max-w-[calc(100%-32px-6px)] max-sm:px-1.5',
                    ui: {
                        label: 'max-w-[calc(100%-20px-6px)] max-sm:hidden',
                    },
                }"
                :userProps="{
                    ui: {
                        wrapper: 'max-sm:hidden',
                    },
                }"
            />
        </template>
    </UHeader>
</template>
