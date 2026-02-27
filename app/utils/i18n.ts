import type { Translations } from './translations';

import { translations } from './translations';

type DotPaths<T, Prefix extends string = ''> = {
    [K in keyof T]: T[K] extends object
        ? DotPaths<T[K], `${Prefix}${K & string}.`>
        : `${Prefix}${K & string}`;
}[keyof T];

type GetValue<T, Path extends string>
    = Path extends `${infer Head}.${infer Tail}`
        ? Head extends keyof T
            ? GetValue<T[Head], Tail>
            : never
        : Path extends keyof T
            ? T[Path]
            : never;

type ExtractParams<S extends string>
    = S extends `${string}{${infer Param}}${infer Rest}`
        ? Param | ExtractParams<Rest>
        : never;

type Params<S extends string> = {
    [K in ExtractParams<S>]: string;
};

type TranslationKey = DotPaths<Translations>;

export function $t<K extends TranslationKey>(
    key: K,
    ...args: ExtractParams<GetValue<Translations, K> & string> extends never
        ? []
        : [params: Params<GetValue<Translations, K> & string>]
): string {
    const value = key.split('.').reduce<unknown>((obj, k) => {
        return (obj as Record<string, unknown>)[k];
    }, translations) as string;

    if (!args[0])
        return value;

    return value.replace(/\{(\w+)\}/g, (_, param) => {
        return (args[0] as Record<string, string>)[param] ?? `{${param}}`;
    });
}
