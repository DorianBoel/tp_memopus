import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useState } from "react";
import { Button, Card, Dropdown, Form, Modal } from "react-bootstrap";
import { useFetcher, type FetcherWithComponents } from "react-router-dom";
import { CardInterface } from "../model/Card";
import ModifyCardModal from "./ModifyCardModal";

const MemoCard = (props: CardInterface) => {
    const fetcher: FetcherWithComponents<number> = useFetcher();

    const [showAnswer, setShowAnswer] = useState(false);

    const [showModifyModal, setShowModifyModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const toggleOptions = forwardRef(({ children, onClick }: any, ref) => (
        <span onClick={ (e) => {
            onClick(e);
        } }>{ children }</span>
    ));

    return (
        <>
            <Card className="px-0">
                <Card.Body>
                    <div className="row">
                        <Card.Title className="h6 col">
                            { props.question } ?
                        </Card.Title>
                        <Dropdown className="d-flex justify-content-end col-1">
                            <Dropdown.Toggle as={ toggleOptions }>
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
                    </div>
                    <Button variant="secondary" size="sm" onClick={ () => setShowAnswer((val) => !val) }>
                        { showAnswer ? "Masquer" : "Afficher"} la réponse
                    </Button>
                    <Card.Text>
                        { showAnswer && props.answer }
                    </Card.Text>
                </Card.Body>
            </Card>
            <ModifyCardModal { ...props } show={ showModifyModal } handleClose={ () => setShowModifyModal(false) } />
            <Modal show={ showDeleteModal } onHide={ () => setShowDeleteModal(false) }>
                <Modal.Header closeButton>
                    <Modal.Title>Suppression d'une fiche mémo</Modal.Title>
                </Modal.Header>
                <fetcher.Form action="/card/delete" method="DELETE">
                    <Modal.Body>
                        <Form.Control type="hidden" name="deleteCardId" value={ props.id } />
                        <p>Voulez-vous vraiment supprimer cette fiche ?</p>
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

export default MemoCard;
