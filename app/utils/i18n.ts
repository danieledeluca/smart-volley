import i18n from '~/i18n/it.json';

type LeafKeyOf<T extends object> = {
    [K in keyof T & string]:
    T[K] extends object
        ? `${K}.${LeafKeyOf<T[K]>}`
        : `${K}`
}[keyof T & string];

type ExtractParams<S extends string>
    = S extends `${string}{${infer Param}}${infer Rest}`
        ? Param | ExtractParams<Rest>
        : never;

type ParamsObject<S extends string>
    = ExtractParams<S> extends never
        ? undefined
        : Record<ExtractParams<S>, string | number>;

type PathValue<T, P extends string>
    = P extends `${infer K}.${infer Rest}`
        ? K extends keyof T
            ? PathValue<T[K], Rest>
            : never
        : P extends keyof T
            ? T[P]
            : never;

type I18nKey = LeafKeyOf<typeof i18n>;
type TranslationValue<K extends I18nKey> = PathValue<typeof i18n, K>;

export function $t<K extends I18nKey>(key: K, ...args: ParamsObject<TranslationValue<K>> extends undefined ? [] : [params: ParamsObject<TranslationValue<K>>]) {
    const value = key.split('.').reduce<unknown>((acc, key) => {
        if (typeof acc === 'object' && acc !== null && key in acc) {
            return (acc as Record<string, unknown>)[key];
        }

        return '';
    }, i18n as Record<string, unknown>) as string;

    const params = args[0];

    if (params) {
        return Object.entries(params).reduce((acc, [key, value]) => acc.replace(new RegExp(`{${key}}`, 'g'), String(value)), value);
    }

    return value;
}
