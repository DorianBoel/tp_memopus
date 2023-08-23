import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { TermInterface } from "../model/Term";
import { type FetcherWithComponents, type NavigateFunction, useFetcher, useNavigate } from "react-router-dom";
import ModifyTermModal from "./ModifyTermModal";

const TermRow = (props: TermInterface) => {
    const navigate: NavigateFunction = useNavigate();

    const [showModifyModal, setShowModifyModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetcher: FetcherWithComponents<number> = useFetcher();

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

    return (
        <>
            <tr>
                <td className="term-td d-flex justify-content-between" onClick={ (evt) => toTermView(props, evt) }>
                    <span className="">{ props.name }</span>
                    <Dropdown drop="start">
                        <Dropdown.Toggle as={ toggleOptions } id="dropdown-basic">
                            <FontAwesomeIcon className="text-secondary mt-1" icon={ faGear } size="lg" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
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
                        <Form.Control type="hidden" name="deleteTermId" value={ props.id } autoFocus />
                        <p>Voulez-vous vraiment supprimer la thématique '{ props.name }' ?</p>
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
}

export default TermRow;
