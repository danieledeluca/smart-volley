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
                :dropdownMenuProps="{
                    content: {
                        align: collapsed ? 'start' : 'end',
                    },
                }"
                :buttonProps="{
                    variant: 'ghost',
                    color: 'neutral',
                    class: collapsed ? 'px-1.5' : 'max-w-[calc(100%-32px-6px)]',
                    trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
                    block: true,
                }"
                :userProps="{
                    class: collapsed ? '' : 'max-w-[calc(100%-20px-6px-2px)]!',
                    ui: {
                        avatar: collapsed ? 'size-5' : '',
                        wrapper: collapsed ? 'hidden' : '',
                    },
                }"
            />
        </template>
    </UDashboardSidebar>
</template>
