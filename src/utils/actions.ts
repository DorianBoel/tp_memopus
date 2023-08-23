import { type ActionFunctionArgs } from "react-router-dom";
import TermService from "../services/TermService";
import { TermInterface } from "../model/Term";

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
