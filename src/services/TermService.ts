import { type TermInterface } from "../model/Term";

export default class TermService {

    private static URL = `${process.env.REACT_APP_SERVER_URL}/terms`;

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

    public async getById(termId: number): Promise<TermInterface> {
        return fetch(`${TermService.URL}/${termId}`)
            .then((res) => res.json())
            .catch((err) => { throw err; });
    }

    public async add(term: Partial<TermInterface>): Promise<TermInterface> {
        return fetch(TermService.URL, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(term),
        })
        .then((res) => res.json())
        .catch((err) => { throw err; });
    }

    public async modify(term: TermInterface): Promise<TermInterface> {
        return fetch(`${TermService.URL}/${term.id}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(term),
        })
        .then((res) => res.json())
        .catch((err) => { throw err; });
    }

    public async delete(termId: number): Promise<number> {
        return fetch(`${TermService.URL}/${termId}`, { method: "DELETE" })
            .then(() => termId)
            .catch((err) => { throw err; });
    }

}
