import { type UserInterface } from "../model/User";

export default class AuthService {

    private static URL = `${process.env.REACT_APP_SERVER_URL}/users`;

    private static instance: AuthService;

    public static getInstance(): AuthService {
        if (!AuthService.instance)
        AuthService.instance = new AuthService();
        return AuthService.instance;
    }

    private async getAllUsers(): Promise<UserInterface[]> {
        return fetch(AuthService.URL)
        .then((res) => res.json())
        .catch((err) => { throw err; });
    }

    public async login(username: string, pwd: string): Promise<Partial<UserInterface> | false> {
        const users = await this.getAllUsers();
        const user = users.find((user) => user.username === username);
        if (user) {
            if (user.pwd === pwd) {
                return { id: user.id, username: username }
            }
            return false;
        }
        return false;
    }

}
