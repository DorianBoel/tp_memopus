import { LoaderFunctionArgs } from "react-router-dom";
import { type TermInterface } from "../model/Term";
import TermService from "../services/TermService";
import { ColumnInterface } from "../model/Column";
import ColumnService from "../services/ColumnService";
import { CardInterface } from "../model/Card";
import CardService from "../services/CardService";

export const termListLoader = async (): Promise<TermInterface[]> => {
    return TermService.getInstance().getAll();
};

export type TermViewLoaderData = [
    TermInterface,
    CardInterface[],
    ColumnInterface[],
]

export const termViewLoader = async ({ params }: LoaderFunctionArgs): Promise<TermViewLoaderData> => {
    const termId: number = parseInt(params.id!);
    return Promise.all([
        TermService.getInstance().getById(termId),
        CardService.getInstance().getByTerm(termId),
        ColumnService.getInstance().getAll(),
    ]);
}
