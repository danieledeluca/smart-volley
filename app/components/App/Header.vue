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
                }"
            />
        </template>
    </UHeader>
</template>
