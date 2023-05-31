/**
 * Only returns the object key that are not optional.
 * @since 1.0.0
 */
export type RequiredKeys<T> = { [K in keyof T]-?: object extends Pick<T, K> ? never : K }[keyof T];
