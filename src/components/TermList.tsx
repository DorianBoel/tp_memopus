import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { type CardInterface } from "../model/Card";
import { type TermInterface } from "../model/Term";
import { type TermListLoaderData } from "../utils/loaders";
import AddTermModal from "./AddTermModal";
import TermRow from "./TermRow";

const TermList = () => {
    const [showAddTermModal, setShowAddTermModal] = useState(false);

    const [terms, cards, columns]: TermListLoaderData = useLoaderData() as TermListLoaderData;

    const cardsOfTerm = (term: TermInterface): CardInterface[] => {
        return cards.filter((card) => {
            return card.tid === term.id;
        });
    }

    return (
        <>
            <div className="row mb-1">
                <p className="h3 col mb-0">Liste des thématiques</p>
                <div className="col-1 d-flex justify-content-end">
                    <Button variant="success" onClick={ () => setShowAddTermModal(true) }>
                        <FontAwesomeIcon icon={ faPlus }></FontAwesomeIcon>
                    </Button>
                </div>
            </div>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>
                            Thématique
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { terms.map((term) =>
                        <TermRow
                            key={ term.id }
                            { ...term }
                            cards={ cardsOfTerm(term) }
                            columns={ columns } />
                    ) }
                </tbody>
            </Table>
            <AddTermModal
                show={ showAddTermModal }
                handleClose={ () => setShowAddTermModal(false) } />
        </>
    );
};

export default TermList;
