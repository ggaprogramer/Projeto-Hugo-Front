import {isAuthenticatedInterface} from '@auth/interfaces';

export interface QuestionInterface{
    order: number;
    title: string;
    description: string;
}

export interface HomePagePropsInterface {
    userIsAuthenticated: string | undefined;
}

export interface HeaderHomePropsInterface {
    userIsAuthenticated: isAuthenticatedInterface
}

export interface HeaderNavPropsInterface {
    userIsAuthenticated: string | undefined;
}

export interface MainHomePropsInterface {
    userIsAuthenticated: string | undefined;
}

export interface FooterHomePropsInterface {
    userIsAuthenticated: isAuthenticatedInterface;
}

export interface FooterNavPropsInterface {
    userIsAuthenticated: string | undefined;
}

export interface MessageBox {
    type: MessageType,
    message: string,
}
export type MessageType = 'INFO' | 'ERROR' | 'SUCCESS';