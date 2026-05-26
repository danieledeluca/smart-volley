<script setup lang="ts">
const { phoneNumber } = defineProps<{
    phoneNumber: string;
}>();
</script>

<template>
    <div class="flex gap-2">
        <UButton
            variant="ghost"
            icon="i-lucide-phone"
            :href="`tel:${formatPhoneNumber(phoneNumber)}`"
        />
        <UButton
            variant="ghost"
            icon="i-simple-icons-whatsapp"
            :href="`https://api.whatsapp.com/send?phone=${formatPhoneNumber(phoneNumber)}`"
            target="_blank"
        />
    </div>
</template>
