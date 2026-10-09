<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui';
import type { SelectUsers, UserRoleSchema } from '~~/lib/db/schema';
import type { FetchError } from 'ofetch';

import { userRole } from '~~/lib/db/schema';

const { user } = defineProps<{
    user: SelectUsers;
}>();

const toast = useToast();
const { $csrfFetch } = useNuxtApp();
const authStore = useAuthStore();

const isLoading = ref(false);

const formField = computed<FormField<{ role?: UserRoleSchema }>>(() => {
    return {
        renderAs: 'select',
        formFieldProps: {
            name: 'role',
        },
        selectProps: {
            placeholder: $t('form.field.user_role.placeholder'),
            items: [
                ...userRole.enumValues.map<SelectItem>((role) => {
                    return {
                        label: role,
                        value: role,
                        disabled: user.role === role,
                    };
                }),
            ],
            loading: isLoading.value,
            ui: {
                value: 'capitalize',
                item: 'capitalize',
            },
        },
    };
});

async function handleUpdate(userRole: UserRoleSchema) {
    isLoading.value = true;

    try {
        await $csrfFetch(`/api/users/${user.id}`, {
            method: 'PATCH',
            body: {
                role: userRole,
            },
        });

        await authStore.refreshUsers();

        toast.add({
            description: $t('form.user_role.edit.success'),
            color: 'success',
            icon: 'i-lucide-circle-check',
        });
    } catch (err) {
        const error = err as FetchError;

        toast.add({
            description: getApiError(error),
            color: 'error',
            icon: 'i-lucide-circle-x',
        });
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <div class="flex items-center justify-between gap-3 border-t border-default px-4 py-3 sm:px-6">
        <div class="flex min-w-0 items-center gap-3">
            <UUser
                :name="user.name"
                :description="user.email"
                :avatar="{
                    src: user.image ?? undefined,
                    alt: user.name,
                }"
                :chip="!user.role ? {
                    color: 'warning',
                    position: 'top-left',
                } : undefined"
                :ui="{
                    root: 'min-w-0',
                    wrapper: 'min-w-0',
                    name: 'truncate',
                    description: 'truncate',
                }"
            />
        </div>
        <FormField
            :modelValue="user.role ?? undefined"
            class="w-full max-w-48"
            :field="formField"
            @update:modelValue="handleUpdate($event)"
        />
    </div>
</template>
