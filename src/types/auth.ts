export interface User {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
}

export interface AuthContextProps {
    auth: {
        loading: boolean;
        authenticate: (token: string, userData: any) => void;
        logout: () => Promise<void>;
        user: User | null;
    };
}

export interface AuthProviderProps {
    children: React.ReactNode;
}