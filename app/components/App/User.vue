<script setup lang="ts">
import type { AvatarProps, UserProps, UserSlots } from '@nuxt/ui';

const { userProps, avatarProps, avatarSize } = defineProps<{
    userProps: Omit<UserProps, 'name' | 'avatar'> & { name: string };
    avatarProps?: AvatarProps;
    avatarSize?: number;
}>();

const slots = defineSlots<UserSlots>();

const avatar = computed(() => {
    return {
        ...getAvatar(userProps.name, avatarSize),
        ...avatarProps,
    };
});
</script>

<template>
    <UUser v-bind="userProps" :avatar>
        <template v-if="!!slots.description" #description>
            <slot name="description" />
        </template>
    </UUser>
</template>
