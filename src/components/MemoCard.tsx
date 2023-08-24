import { faGear, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useState } from "react";
import { Button, Card, Dropdown, Form, Modal } from "react-bootstrap";
import { useFetcher, type FetcherWithComponents } from "react-router-dom";
import { CardInterface } from "../model/Card";
import ModifyCardModal from "./ModifyCardModal";
import { useDrag } from "react-dnd";
import CardService from "../services/CardService";
import { ColumnInterface } from "../model/Column";

const MemoCard = (props: CardInterface) => {
    const fetcherMove: FetcherWithComponents<CardInterface> = useFetcher();

    const fetcherDelete: FetcherWithComponents<number> = useFetcher();

    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
            type: "card",
            item: { id: props.id, column: props.column },
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult<Partial<ColumnInterface>>();
                if (item && dropResult) {
                    if (typeof dropResult.id === "number" && item.column !== dropResult.id) {
                        moveCard(props, dropResult.id);
                    }
                }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        })
    );

    const [showAnswer, setShowAnswer] = useState(false);

    const [showModifyModal, setShowModifyModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const toggleOptions = forwardRef(({ children, onClick }: any, ref) => (
        <span onClick={ (e) => {
            onClick(e);
        } }>{ children }</span>
    ));

    const moveCard = async (card: CardInterface, columnId: number) => {
        let formData = new FormData();
        formData.append("cardId", card.id.toString());
        formData.append("columnId", columnId.toString());
        fetcherMove.submit(formData, {
            method: "POST",
            action: "/card/move"
        });
        await CardService.getInstance().modify({ ...card, column: columnId });
    }

    return (
        <>
            <Card className={ `px-0 ${isDragging ? "dragging" : ""}` } ref={ dragPreview }>
                <Card.Header className="d-flex justify-content-end">
                    <span className="draggable" ref={ drag }>
                        <FontAwesomeIcon className="text-secondary" size="lg" icon={ faGripVertical } />
                    </span>
                </Card.Header>
                <Card.Body>
                    <div className="row">
                        <Card.Title className="h6 col">
                            { props.question } ?
                        </Card.Title>
                        <Dropdown className="d-flex justify-content-end col-1">
                            <Dropdown.Toggle as={ toggleOptions }>
                                <FontAwesomeIcon className="text-secondary" size="lg" icon={ faGear } />
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
                    <div className="d-flex">
                        <Button className="m-auto" variant="secondary" size="sm" onClick={ () => setShowAnswer((val) => !val) }>
                            { showAnswer ? "Masquer" : "Afficher"} la réponse
                        </Button>
                    </div>
                    { showAnswer &&
                        <Card.Text className="pt-2">
                            { props.answer }
                        </Card.Text>
                    }
                </Card.Body>
            </Card>
            <ModifyCardModal { ...props } show={ showModifyModal } handleClose={ () => setShowModifyModal(false) } />
            <Modal show={ showDeleteModal } onHide={ () => setShowDeleteModal(false) }>
                <Modal.Header closeButton>
                    <Modal.Title>Suppression d'une fiche mémo</Modal.Title>
                </Modal.Header>
                <fetcherDelete.Form action="/card/delete" method="DELETE">
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
                </fetcherDelete.Form>
            </Modal>
        </>
    );
};

export default MemoCard;
