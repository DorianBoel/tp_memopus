import { type TermInterface } from "../model/Term";

export default class TermService {

    private static URL = "http://localhost:3001/terms";

    private static instance: TermService;

    public static getInstance(): TermService {
        if (!TermService.instance)
            TermService.instance = new TermService();
        return TermService.instance;
    }

    private constructor() { }

    public async getAll(): Promise<TermInterface[]> {
        return fetch(TermService.URL)
            .then((res) => res.json())
            .catch((err) => { throw err; });
    }

}
