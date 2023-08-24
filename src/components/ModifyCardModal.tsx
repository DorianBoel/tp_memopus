import { FetcherWithComponents, useFetcher } from "react-router-dom";
import { CardInterface } from "../model/Card";
import { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface ModifyCardModalProps {
    show: boolean;
    handleClose: () => void;
}

const ModifyCardModal = (props: CardInterface & ModifyCardModalProps) => {
    const fetcher: FetcherWithComponents<CardInterface> = useFetcher();

    const modifyCardQuestionRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

    const modifyCardQuestionFeedbackRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

    const [modifyCardQuestionValue, setModifyCardQuestionValue] = useState(props.question);

    const [modifyCardQuestionInvalid, setModifyCardQuestionInvalid] = useState(false);

    const [modifyCardAnswerValue, setModifyCardAnswerValue] = useState(props.answer);

    const resetValidation = () => {
        setModifyCardQuestionInvalid(false);
        modifyCardQuestionFeedbackRef.current.innerHTML = "";
    };

    const handleClose = () => {
        resetValidation();
        props.handleClose();
    };

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
        evt.preventDefault();
        resetValidation();
        const validationErrors: [string, () => void][] = [];
        if (!modifyCardQuestionRef.current.value.trim().length) {
            validationErrors.push([
                "Le nom ne doit pas être vide.",
                () => setModifyCardQuestionInvalid(true),
            ]);
        }
        if (validationErrors.length) {
            modifyCardQuestionFeedbackRef.current.innerHTML = validationErrors
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
                <Modal.Title>Modifier une thématique</Modal.Title>
            </Modal.Header>
            <fetcher.Form action="/card/modify" method="PUT" onSubmit={ (evt) => handleSubmit(evt) }>
                <Modal.Body>
                    <Form.Group className="mb-2" controlId="modifyCardQuestion">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            name="modifyCardQuestion"
                            placeholder="Ex: Que signifie l'acronyme CSS ?"
                            autoFocus
                            value={ modifyCardQuestionValue }
                            onChange={ (evt) => setModifyCardQuestionValue(evt.target.value) }
                            onInput={ () => setModifyCardQuestionInvalid(false) }
                            isInvalid={ modifyCardQuestionInvalid }
                            ref={ modifyCardQuestionRef } />
                        <Form.Control.Feedback type="invalid" ref={ modifyCardQuestionFeedbackRef } />
                    </Form.Group>
                    <Form.Group controlId="modifyCardAnswer">
                        <Form.Label>Réponse</Form.Label>
                        <Form.Control
                            type="text"
                            name="modifyCardAnswer"
                            placeholder="Ex: Cascading Style Sheets"
                            value={ modifyCardAnswerValue }
                            onChange={ (evt) => setModifyCardAnswerValue(evt.target.value) } />
                    </Form.Group>
                    <Form.Control type="hidden" name="modifyCardId" value={ props.id } />
                    <Form.Control type="hidden" name="modifyCardTerm" value={ props.tid } />
                    <Form.Control type="hidden" name="modifyCardColumn" value={ props.column } />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Enregistrer
                    </Button>
                </Modal.Footer>
            </fetcher.Form>
        </Modal>
    );
};

export default ModifyCardModal;
