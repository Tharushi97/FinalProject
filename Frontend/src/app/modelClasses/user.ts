export class User {
        _id: number;
        userName: string;
        email: string;
        password: string;
        token?: string;

        firstname: string;
        lastname: string;
        address: string;
        city: string;
        country: string;
        postalCode: number;
        about: string;
        accessLevel: number;
        rateCVs: boolean;
        sendMails: boolean;
        interview: boolean;
}
