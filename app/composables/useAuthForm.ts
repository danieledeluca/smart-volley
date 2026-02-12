import type { FormSubmitEvent } from '@nuxt/ui';
import type { ZodType } from 'zod';

export default function useAuthForm<T>(
    schema: ZodType<T>,
    callback: (event: FormSubmitEvent<T>) => Promise<void>,
) {
    const toast = useToast();

    const state = reactive<Partial<T>>({});

    async function onSubmit(event: FormSubmitEvent<T>) {
        try {
            await callback(event);
        } catch (err) {
            const error = err as Error;

            toast.add({
                title: error.message,
                color: 'error',
                icon: 'i-lucide-circle-x',
            });
        }
    }

    return {
        state,
        onSubmit,
    };
}
