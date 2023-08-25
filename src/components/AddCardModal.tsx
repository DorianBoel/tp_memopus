import { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFetcher, type FetcherWithComponents } from "react-router-dom";
import { type CardInterface } from "../model/Card";
import { type ColumnInterface } from "../model/Column";

interface AddCardModalProps {
    show: boolean;
    handleClose: () => void;
    termId: number;
    column: ColumnInterface | undefined;
}

const AddCardModal = (props: AddCardModalProps) => {
    const fetcher: FetcherWithComponents<CardInterface> = useFetcher();

    const addCardQuestionRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

    const addCardQuestionFeedbackRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

    const [addCardQuestionInvalid, setAddCardQuestionInvalid] = useState(false);

    const resetValidation = () => {
        setAddCardQuestionInvalid(false);
        addCardQuestionFeedbackRef.current.innerHTML = "";
    };

    const handleClose = () => {
        resetValidation();
        props.handleClose();
    };

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
        evt.preventDefault();
        resetValidation();
        const validationErrors: [string, () => void][] = [];
        if (!addCardQuestionRef.current.value.trim().length) {
            validationErrors.push([
                "La question ne doit pas être vide.",
                () => setAddCardQuestionInvalid(true),
            ]);
        }
        if (validationErrors.length) {
            addCardQuestionFeedbackRef.current.innerHTML = validationErrors
                .map((valid) => `<span>${valid[0]}</span>`)
                .join("");
            validationErrors.forEach((valid) => {
                valid[1]();
            });
            return;
        }
        fetcher.submit(evt.target as HTMLFormElement);
        handleClose();
    };

    return (
        <Modal show={ props.show } onHide={ handleClose }>
            <Modal.Header closeButton>
                <Modal.Title>Nouvelle fiche mémo</Modal.Title>
            </Modal.Header>
            <fetcher.Form action="/card/add" method="POST" onSubmit={ (evt) => handleSubmit(evt) }>
                <Modal.Body>
                    <Form.Group className="mb-2" controlId="addCardQuestion">
                        <Form.Label>Question</Form.Label>
                        <Form.Control
                            type="text"
                            name="addCardQuestion"
                            autoFocus
                            placeholder="Ex: Que signifie l'acronyme CSS ?"
                            onInput={ () => setAddCardQuestionInvalid(false) }
                            isInvalid={ addCardQuestionInvalid }
                            ref={ addCardQuestionRef } />
                        <Form.Control.Feedback type="invalid" ref={ addCardQuestionFeedbackRef } />
                    </Form.Group>
                    <Form.Group controlId="addCardAnswer">
                        <Form.Label>Réponse</Form.Label>
                        <Form.Control
                            type="text"
                            name="addCardAnswer"
                            placeholder="Ex: Cascading Style Sheets"/>
                    </Form.Group>
                    <Form.Control type="hidden" name="addCardTerm" value={ props.termId } />
                    <Form.Control type="hidden" name="addCardColumn" value={ props.column?.id } />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Ajouter
                    </Button>
                </Modal.Footer>
            </fetcher.Form>
        </Modal>
    );
}

export default AddCardModal;
