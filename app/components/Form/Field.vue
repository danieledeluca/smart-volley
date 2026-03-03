<script setup lang="ts" generic="T">
const { field } = defineProps<{
    field: FilterField<T>;
}>();

const model = defineModel<string | number>();
</script>

<template>
    <div
        v-if="field.type === 'input' || (field.type === 'select' && field.items?.length)"
        class="flex items-start gap-2"
    >
        <UFormField
            :name="field.name"
            :label="field.label"
            class="flex-1"
            :required="field.required"
        >
            <UInput
                v-if="field.type === 'input'"
                v-bind="field"
                v-model="model"
                class="w-full"
            />
            <USelect
                v-else-if="field.type === 'select'"
                v-bind="field"
                v-model="model"
                class="w-full"
            />
        </UFormField>
        <UButton
            v-if="field.type === 'select' && model"
            icon="i-lucide-x"
            variant="outline"
            color="error"
            class="mt-6"
            @click.stop="model = undefined"
        />
    </div>
</template>
