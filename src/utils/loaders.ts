import { type TermInterface } from "../model/Term";
import TermService from "../services/TermService";

export const termListLoader = async (): Promise<TermInterface[]> => {
    return TermService.getInstance().getAll();
};
