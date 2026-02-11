import type { ZodType } from 'zod';

export default function useAuthForm<T>(
    schema: ZodType<T>,
    callback: (data: T) => Promise<any>,
) {
    const state = reactive<Partial<T>>({});
    const errors = reactive<Partial<T>>({});

    const messages = ref<Message[]>([]);
    const isLoading = ref(false);

    async function onSubmit() {
        messages.value = [];
        Object.keys(errors).forEach((key) => {
            errors[key as keyof T] = undefined;
        });

        const result = schema.safeParse(state);

        if (!result.success) {
            result.error.issues.forEach((issue) => {
                errors[issue.path[0] as keyof T] = issue.message;
            });

            return;
        }

        try {
            isLoading.value = true;

            await callback(result.data);
        } catch (err) {
            const error = err as Error;

            messages.value.push({
                text: error.message,
                type: 'error',
            });
        } finally {
            isLoading.value = false;
        }
    }

    return {
        state,
        errors,
        messages,
        isLoading,
        onSubmit,
    };
}
