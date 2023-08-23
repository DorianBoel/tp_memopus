import { type ColumnInterface } from "../model/Column";

export default class ColumnService {

    private static URL = "http://localhost:3001/columns";

    private static instance: ColumnService;

    public static getInstance(): ColumnService {
        if (!ColumnService.instance)
            ColumnService.instance = new ColumnService();
        return ColumnService.instance;
    }

    private constructor() { }

    public async getAll(): Promise<ColumnInterface[]> {
        return fetch(ColumnService.URL)
            .then((res) => res.json())
            .catch((err) => { throw err; });
    }

}
