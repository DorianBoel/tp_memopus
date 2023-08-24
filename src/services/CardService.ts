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

    public async getById(cardId: number): Promise<CardInterface> {
        return fetch(`${CardService.URL}/${cardId}`)
            .then((res) => res.json())
            .catch((err) => { throw err; });
    }

    public async getByTerm(termId: number): Promise<CardInterface[]> {
        const cards = await this.getAll();
        return cards.filter((card) => {
            return card.tid === termId;
        });
    }

    public async add(card: Partial<CardInterface>): Promise<CardInterface> {
        return fetch(CardService.URL, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(card),
        })
        .then((res) => res.json())
        .catch((err) => { throw err; });
    }

    public async modify(card: CardInterface): Promise<CardInterface> {
        return fetch(`${CardService.URL}/${card.id}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(card),
        })
        .then((res) => res.json())
        .catch((err) => { throw err; });
    }

    public async delete(cardId: number): Promise<number> {
        return fetch(`${CardService.URL}/${cardId}`, { method: "DELETE" })
            .then(() => cardId)
            .catch((err) => { throw err; });
    }

}
