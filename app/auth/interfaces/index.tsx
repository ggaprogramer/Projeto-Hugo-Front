export interface OptionType {
    value: string;
    label: string;
}

export interface Errors {
    type: string;
    description: string;
}

export interface ErrorsComponents {
    errors: Errors[],
    type: string,
}