import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { TermInterface } from "../model/Term";
import AddTermModal from "./AddTermModal";
import TermRow from "./TermRow";

const TermList = () => {
    const [showAddTermModal, setShowAddTermModal] = useState(false);

    const terms: TermInterface[] = useLoaderData() as TermInterface[];

    return (
        <>
            <div className="row mb-1">
                <p className="h3 col-11 mb-0">Liste des thématiques</p>
                <div className="col d-flex justify-content-end">
                    <Button variant="success" onClick={ () => setShowAddTermModal(true) }>
                        <FontAwesomeIcon icon={ faPlus }></FontAwesomeIcon>
                    </Button>
                    <AddTermModal
                        show={ showAddTermModal }
                        handleClose={ () => setShowAddTermModal(false) } />
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
                        <TermRow key={ term.id } { ...term } />
                    ) }
                </tbody>
            </Table>
        </>
    );
}

export default TermList;
