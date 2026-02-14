export default defineAppConfig({
    ui: {
        main: {
            base: 'min-h-[calc(100vh-var(--ui-header-height)-var(--ui-footer-height))]',
        },
        footer: {
            slots: {
                container: 'max-lg:py-4',
                center: 'max-lg:mt-0',
                left: 'max-lg:mt-0',
            },
        },
        button: {
            slots: {
                base: 'disabled:opacity-50',
            },
        },
    },
});
