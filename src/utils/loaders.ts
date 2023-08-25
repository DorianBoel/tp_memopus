import { type LoaderFunctionArgs } from "react-router-dom";
import { type CardInterface } from "../model/Card";
import { type ColumnInterface } from "../model/Column";
import { type TermInterface } from "../model/Term";
import CardService from "../services/CardService";
import ColumnService from "../services/ColumnService";
import TermService from "../services/TermService";


const termService: TermService = TermService.getInstance();
const cardService: CardService = CardService.getInstance();
const columnService: ColumnService = ColumnService.getInstance();

type BaseLoaderData = [
    CardInterface[],
    ColumnInterface[],
]

export type TermListLoaderData = [
    TermInterface[],
    ...BaseLoaderData,
]

export const termListLoader = async (): Promise<TermListLoaderData> => {
    return Promise.all([
        termService.getAll(),
        cardService.getAll(),
        columnService.getAll(),
    ]);
};

export type TermViewLoaderData = [
    TermInterface,
    ...BaseLoaderData,
]

export const termViewLoader = async ({ params }: LoaderFunctionArgs): Promise<TermViewLoaderData> => {
    const termId: number = parseInt(params.id!);
    return Promise.all([
        termService.getById(termId),
        cardService.getByTerm(termId),
        columnService.getAll(),
    ]);
}
