import { faAngleLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import { type TermViewLoaderData } from "../utils/loaders";
import MemoCard from "./MemoCard";
import { useState } from "react";
import AddCardModal from "./AddCardModal";
import { type ColumnInterface } from "../model/Column";

const TermView = () => {
    const [term, cards, columns]: TermViewLoaderData = useLoaderData() as TermViewLoaderData;

    const [showAddCardModal, setShowAddCardModal] = useState(false);

    const [currentColumn, setCurrentColumn] = useState<ColumnInterface>();

    const cardsByColumn = (columnId: number) => {
        return cards.filter((card) =>
            card.column === columnId
        );
    }

    const openAddCardModal = (column: ColumnInterface) => {
        setShowAddCardModal(true);
        setCurrentColumn(column);
    }

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
                    <Col key={ column.id } className="mb-1" md>
                        <div className="row mb-2 align-items-baseline">
                            <div className="col-2 d-flex justify-content-start">
                                <Button variant="success" size="sm" onClick={ () => openAddCardModal(column) }>
                                    <FontAwesomeIcon icon={ faPlus }></FontAwesomeIcon>
                                </Button>
                            </div>
                            <p className="col h5">{ column.label }</p>
                        </div>
                        <div className="row flex-column g-2">
                            { cardsByColumn(column.id).map((card) =>
                                <MemoCard key={ card.id } { ...card } />
                            ) }
                        </div>
                    </Col>
                ) }
            </Row>
            <AddCardModal
                show={ showAddCardModal }
                handleClose={ () => setShowAddCardModal(false) }
                termId={ term.id }
                column={ currentColumn } />
        </>
    );
}

export default TermView;
