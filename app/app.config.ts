export default defineAppConfig({
    ui: {
        button: {
            slots: {
                base: 'disabled:opacity-50',
            },
        },
        inputDate: {
            slots: {
                base: 'has-[+[data-slot="error"]]:ring-error',
            },
        },
        inputNumber: {
            slots: {
                root: '[&:has(+[data-slot="error"])_[data-slot="base"]]:ring-error',
            },
        },
        fileUpload: {
            slots: {
                root: 'has-[+[data-slot="error"]]:**:ring-error',
                base: 'ring ring-inset ring-accented border-none!',
            },
        },
        modal: {
            slots: {
                footer: 'justify-end',
            },
        },
        slideover: {
            slots: {
                footer: 'justify-end',
            },
        },
    },
});
