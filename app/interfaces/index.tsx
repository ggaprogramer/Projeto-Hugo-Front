export interface QuestionInterface{
    order: number;
    title: string;
    description: string;
}

export interface HomePagePropsInterface {
    userIsAuthenticated: boolean | undefined;
}

export interface HeaderHomePropsInterface {
    userIsAuthenticated: boolean | undefined;
}

export interface MainHomePropsInterface {
    userIsAuthenticated: boolean | undefined;
}

export interface FooterHomePropsInterface {
    userIsAuthenticated: boolean | undefined;
}