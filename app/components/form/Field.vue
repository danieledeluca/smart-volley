<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

const { label, id, type } = defineProps<{
    label: string;
    id: string;
    type: InputHTMLAttributes['type'];
}>();

const model = defineModel({ required: true });
const error = defineModel('error', { required: true });
</script>

<template>
    <label :for="id">
        {{ label }}
        <input
            :id="id"
            v-model="model"
            :type="type"
            :name="id"
            :placeholder="label"
            :aria-invalid="error ? 'true' : undefined"
        >
        <small v-if="error">{{ error }}</small>
    </label>
</template>
