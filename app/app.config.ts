/* eslint-disable style/max-len */
export default defineAppConfig({
    ui: {
        formField: {
            slots: {
                root: 'group/form-field',
            },
        },
        input: {
            slots: {
                base: 'group-has-data-[slot=error]/form-field:ring-error! group-has-data-[slot=error]/form-field:focus-visible:outline-error/25',
            },
        },
        inputDate: {
            slots: {
                base: 'group-has-data-[slot=error]/form-field:ring-error! group-has-data-[slot=error]/form-field:has-focus-visible:outline-error/25!',
                trailing: 'pe-1!',
            },
        },
        fileUpload: {
            slots: {
                base: 'ring ring-accented border-none! group-has-data-[slot=error]/form-field:ring-error',
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
