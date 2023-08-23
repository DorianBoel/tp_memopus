import { CardInterface } from "../model/Card";

export default class CardService {

    private static URL = "http://localhost:3001/cards";

    private static instance: CardService;

    public static getInstance(): CardService {
        if (!CardService.instance)
            CardService.instance = new CardService();
        return CardService.instance;
    }

    public async getAll(): Promise<CardInterface[]> {
        return fetch(CardService.URL)
            .then((res) => res.json())
            .catch((err) => { throw err; });
    }

    public async getByTerm(termId: number): Promise<CardInterface[]> {
        const cards = await this.getAll();
        return cards.filter((card) => {
            return card.tid === termId;
        });
    }

    public async add(term: Partial<CardInterface>): Promise<CardInterface> {
        return fetch(CardService.URL, {
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

}
