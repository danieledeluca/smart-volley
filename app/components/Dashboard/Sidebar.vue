<template>
    <UDashboardSidebar
        collapsible
        mode="slideover"
        class="group"
        :ui="{ footer: 'border-t border-default group-data-[collapsed=true]:flex-col' }"
    >
        <template #header="{ collapsed }">
            <NuxtLink to="/">
                <AppLogo v-if="!collapsed" class="max-h-8" />
                <NuxtImg v-else src="logo-small.png" />
            </NuxtLink>
        </template>

        <template #default="{ collapsed }">
            <AppMenu :collapsed orientation="vertical" />
        </template>

        <template #footer="{ collapsed }">
            <UColorModeButton />

            <AuthButton
                :dropdownMenu="{
                    content: {
                        align: collapsed ? 'start' : 'end',
                    },
                }"
                :button="{
                    variant: 'ghost',
                    color: 'neutral',
                    class: !collapsed ? 'max-w-[calc(100%-32px-6px)]' : '',
                    trailingIcon: !collapsed ? 'i-lucide-chevrons-up-down' : undefined,
                    block: true,
                    ui: {
                        label: collapsed ? 'hidden' : '',
                    },
                }"
            />
        </template>
    </UDashboardSidebar>
</template>
