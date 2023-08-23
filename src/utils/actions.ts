import { type ActionFunctionArgs } from "react-router-dom";
import TermService from "../services/TermService";
import { TermInterface } from "../model/Term";
import { CardInterface } from "../model/Card";
import CardService from "../services/CardService";

export const addTermAction = async ({ request }: ActionFunctionArgs): Promise<TermInterface> => {
    const formData: FormData = await request.formData();
    const termName: string = (formData.get("addTermName") as string).trim();
    return TermService.getInstance().add({
        name: termName,
    });
};

export const modifyTermAction = async ({ request }: ActionFunctionArgs): Promise<TermInterface> => {
    const formData: FormData = await request.formData();
    const termName: string = (formData.get("modifyTermName") as string).trim();
    const termId: number = parseInt(formData.get("modifyTermId") as string);
    return TermService.getInstance().modify({
        id: termId,
        name: termName,
    });
}

export const deleteTermAction = async ({ request }: ActionFunctionArgs): Promise<number> => {
    const formData: FormData = await request.formData();
    const termId: number = parseInt(formData.get("deleteTermId") as string);
    return TermService.getInstance().delete(termId);
};

export const addCardAction = async ({ request }: ActionFunctionArgs): Promise<CardInterface> => {
    const formData: FormData = await request.formData();
    let cardQuestion: string = (formData.get("addCardQuestion") as string).trim();
    if (cardQuestion.at(-1) === "?")
        cardQuestion = cardQuestion.slice(0, -1).trim();
    const cardAnwser: string = (formData.get("addCardAnswer") as string);
    const termId: number = parseInt(formData.get("addCardTerm") as string);
    const columnId: number = parseInt(formData.get("addCardColumn") as string);
    return CardService.getInstance().add({
        question: cardQuestion,
        answer: cardAnwser,
        column: columnId,
        tid: termId,
    });
}
