export interface useEffectInterface {
    method: string;
    headers: {
        'Content-Type': 'application/json';
    };
    body: string;
}