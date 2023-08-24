import { LoaderFunctionArgs } from "react-router-dom";
import { type TermInterface } from "../model/Term";
import TermService from "../services/TermService";
import { type ColumnInterface } from "../model/Column";
import ColumnService from "../services/ColumnService";
import { type CardInterface } from "../model/Card";
import CardService from "../services/CardService";


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
