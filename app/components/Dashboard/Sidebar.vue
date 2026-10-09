<template>
    <UDashboardSidebar
        collapsible
        mode="slideover"
        class="group"
        resizable
        :ui="{
            footer: 'lg:border-t lg:border-default group-data-[collapsed=true]:flex-col',
        }"
    >
        <template #header="{ collapsed }">
            <ULink to="/">
                <AppLogo v-if="!collapsed" class="max-h-8" />
                <NuxtImg v-else src="logo-small.png" />
            </ULink>
        </template>

        <template #default="{ collapsed }">
            <AppMenu :collapsed />
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
                    trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
                    block: true,
                    square: collapsed,
                    ui: {
                        trailingIcon: 'text-dimmed',
                    },
                }"
                :userProps="{
                    size: collapsed ? '2xs' : undefined,
                }"
            />
        </template>
    </UDashboardSidebar>
</template>
