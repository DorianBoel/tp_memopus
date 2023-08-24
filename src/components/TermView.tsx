import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import { type ColumnInterface } from "../model/Column";
import { type TermViewLoaderData } from "../utils/loaders";
import AddCardModal from "./AddCardModal";
import Column from "./Column";

const TermView = () => {
    const [term, cards, columns]: TermViewLoaderData = useLoaderData() as TermViewLoaderData;

    const [showAddCardModal, setShowAddCardModal] = useState(false);

    const [currentColumn, setCurrentColumn] = useState<ColumnInterface>();

    const cardsByColumn = (columnId: number) => {
        return cards.filter((card) =>
            card.column === columnId
        );
    };

    const openAddCardModal = (column: ColumnInterface) => {
        setShowAddCardModal(true);
        setCurrentColumn(column);
    };

    return (
        <>
            <div className="mb-3">
                <Link to="/" className="text-decoration-none">
                    <FontAwesomeIcon className="me-1" icon={ faAngleLeft }></FontAwesomeIcon>
                    Retour à la liste des thématiques
                </Link>
            </div>
            <p className="h3 mb-3">{ term.name }</p>
            <Row className="gy-2">
                { columns.map((column) =>
                    <Column
                        key={ column.id }
                        { ...column }
                        cards={ cardsByColumn(column.id) }
                        handleOpenModal={ openAddCardModal } />
                ) }
            </Row>
            <AddCardModal
                show={ showAddCardModal }
                handleClose={ () => setShowAddCardModal(false) }
                termId={ term.id }
                column={ currentColumn } />
        </>
    );
};

export default TermView;
