export interface User {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
}

export interface AuthContextProps {
    manageAuth: {
        loading: boolean;
        authenticate: (token: string, userData: User) => void;
        logout: () => Promise<void>;
        user: User | null;
    };
}

export interface AuthProviderProps {
    children: React.ReactNode;
}