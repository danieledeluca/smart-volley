<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseClient();

const errorMessage = ref('');
const isLoading = ref(false);

async function logOut() {
    try {
        errorMessage.value = '';
        isLoading.value = true;

        const { error } = await client.auth.signOut();

        isLoading.value = false;

        if (error) {
            throw error;
        }

        navigateTo('/');
    } catch (err) {
        const error = err as Error;
        errorMessage.value = error.message;
    }
}
</script>

<template>
    <article>
        <div>Email: <strong>{{ user?.email }}</strong></div>
        <hr>
        <button
            type="button"
            :aria-busy="isLoading ? 'true' : undefined"
            :disabled="isLoading"
            @click="logOut"
        >
            <template v-if="isLoading">
                Please wait...
            </template>
            <template v-else>
                Log out
            </template>
        </button>
    </article>
</template>
