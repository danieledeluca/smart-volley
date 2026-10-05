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
                    class: collapsed ? '' : 'max-w-[calc(100%-32px-6px)]',
                    trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
                    block: true,
                    square: collapsed,
                    ui: {
                        trailingIcon: 'text-dimmed',
                    },
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
