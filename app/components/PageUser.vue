<script setup lang="ts">
const { name, link, badgeLabels } = defineProps<{
    name: string;
    link?: string;
    badgeLabels: (string | null)[];
}>();

const slots = defineSlots<{
    default?: (props?: object) => VNode[];
}>();

const authStore = useAuthStore();
const { canEdit } = storeToRefs(authStore);
</script>

<template>
    <div class="flex items-start gap-4">
        <AppUser
            :avatarSize="96"
            :userProps="{
                name,
                to: link,
                size: '3xl',
            }"
        >
            <template #description>
                <span class="mt-1 flex flex-wrap gap-2">
                    <template
                        v-for="(label, index) in badgeLabels"
                        :key="index"
                    >
                        <UBadge
                            v-if="label"
                            variant="soft"
                            color="neutral"
                            :label
                        />
                    </template>
                </span>
            </template>
        </AppUser>
        <div v-if="canEdit && !!slots.default" class="ml-auto">
            <slot />
        </div>
    </div>
</template>
