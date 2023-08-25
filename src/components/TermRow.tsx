import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { useFetcher, useNavigate, type FetcherWithComponents, type NavigateFunction } from "react-router-dom";
import { CardInterface } from "../model/Card";
import { ColumnInterface } from "../model/Column";
import { TermInterface } from "../model/Term";
import ModifyTermModal from "./ModifyTermModal";

interface TermRowProps {
    cards: CardInterface[];
    columns: ColumnInterface[];
}

const TermRow = (props: TermInterface & TermRowProps) => {
    const navigate: NavigateFunction = useNavigate();

    const fetcher: FetcherWithComponents<number> = useFetcher();

    const [showInfoModal, setShowInfoModal] = useState(false);

    const [showModifyModal, setShowModifyModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const toggleOptions = forwardRef(({ children, onClick }: any, ref) => (
        <span onClick={ (e) => {
            onClick(e);
        } }>{ children }</span>
    ));

    const toTermView = (term: TermInterface, evt: React.MouseEvent) => {
        if ((evt.target as Element).tagName !== "TD"){
            return;
        }
        navigate(`term/${term.id}`);
    };

    const cardsByColumn = (column: ColumnInterface): CardInterface[] => {
        return props.cards.filter((card) =>
            card.column === column.id
        );
    }

    return (
        <>
            <tr>
                <td className="term-td d-flex justify-content-between" onClick={ (evt) => toTermView(props, evt) }>
                    <span className="">{ props.name }</span>
                    <Dropdown>
                        <Dropdown.Toggle as={ toggleOptions }>
                            <FontAwesomeIcon className="text-secondary mt-1" icon={ faGear } size="lg" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={ () => setShowInfoModal(true) }>
                                Infos
                            </Dropdown.Item>
                            <Dropdown.Item onClick={ () => setShowModifyModal(true) }>
                                Modifier
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={ () => setShowDeleteModal(true) }>
                                Supprimer
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
            <Modal size="sm" show={ showInfoModal } onHide={ () => setShowInfoModal(false) }>
                <Modal.Header closeButton>
                    <Modal.Title>Thématique { props.name }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="list-unstyled ps-4">
                        <li>
                            <span className="fw-bold">Niveaux d'apprentissage</span>
                            <ul>
                                { props.columns.map((column) =>
                                    <li key={ column.id }>
                                        <span className="fw-medium">{ column.label } : </span>
                                        { cardsByColumn(column).length }
                                    </li>
                                ) }
                            </ul>
                        </li>
                        <li className="fw-bold">
                            Nb de fiches total : { props.cards.length }
                        </li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ () => setShowInfoModal(false) }>
                            Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
            <ModifyTermModal
                { ...props }
                show={ showModifyModal }
                handleClose={ () => setShowModifyModal(false) } />
            <Modal show={ showDeleteModal } onHide={ () => setShowDeleteModal(false) }>
                <Modal.Header closeButton>
                    <Modal.Title>Suppression d'une thématique</Modal.Title>
                </Modal.Header>
                <fetcher.Form action="/term/delete" method="DELETE">
                    <Modal.Body>
                        <Form.Control type="hidden" name="deleteTermId" value={ props.id } />
                        <p>Voulez-vous vraiment supprimer la thématique '{ props.name }' ?<br />
                        Cela supprimera aussi toutes les fiches associées.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={ () => setShowDeleteModal(false) }>
                            Annuler
                        </Button>
                        <Button variant="danger" type="submit" onClick={ () => setShowDeleteModal(false) }>
                            Supprimer
                        </Button>
                    </Modal.Footer>
                </fetcher.Form>
            </Modal>
        </>
    );
};

export default TermRow;
