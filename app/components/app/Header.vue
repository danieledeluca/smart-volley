<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
    <header>
        <nav class="container">
            <ul>
                <li>
                    <NuxtLink to="/">
                        Smart Volley
                    </NuxtLink>
                </li>
            </ul>
            <ul>
                <li>
                    <NuxtLink to="/">
                        Anagrafica
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink v-if="user" to="/account">
                        Account
                    </NuxtLink>
                    <NuxtLink v-else to="/account/login">
                        Login
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    position: sticky;
    top: 0;
    background-color: color-mix(in srgb, var(--pico-background-color) 50%, transparent);
    border-bottom: 1px solid var(--pico-muted-border-color);
    backdrop-filter: blur(20px);
    z-index: 2;
}
</style>
