import UButton from '@nuxt/ui/components/Button.vue';

export function getPhoneNumberButtonsNode(phoneNumber: string | null) {
    if (phoneNumber) {
        return h('div', { class: 'flex gap-2' }, [
            h(UButton, {
                color: 'primary',
                variant: 'ghost',
                href: `tel:${formatPhoneNumber(phoneNumber)}`,
                icon: 'i-lucide-phone',
            }),
            h(UButton, {
                color: 'primary',
                variant: 'ghost',
                href: `https://api.whatsapp.com/send?phone=${formatPhoneNumber(phoneNumber)}`,
                target: '_blank',
                icon: 'i-simple-icons-whatsapp',
            }),

        ]);
    }

    return '';
}

export function getEmailButtonNode(email: string | null) {
    if (email) {
        return h(UButton, {
            color: 'primary',
            variant: 'ghost',
            href: `mailto:${email}`,
            icon: 'i-lucide-mail',
        });
    }

    return '';
}
