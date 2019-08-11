export type Contains<T> = { [P in keyof T]: T[P] } & {
    [key: string]: any;
};
