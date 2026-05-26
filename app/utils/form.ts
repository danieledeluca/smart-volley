export function toFormData<T extends Record<string, any>>(data: T) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value) {
            formData.append(key, value as Blob);
        }
    });

    return formData;
}
