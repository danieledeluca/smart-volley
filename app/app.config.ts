export default defineAppConfig({
    ui: {
        colors: {
            primary: 'cyan',
        },
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
        pageHeader: {
            slots: {
                root: 'pt-0 border-b-0',
                description: 'text-balance',
            },
        },
        button: {
            slots: {
                base: 'disabled:opacity-50',
            },
        },
    },
});
