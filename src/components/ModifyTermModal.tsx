import { FetcherWithComponents, useFetcher } from "react-router-dom";
import { TermInterface } from "../model/Term";
import { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface ModifyTermModalProps {
    show: boolean;
    handleClose: () => void;
}

const ModifyTermModal = (props: TermInterface & ModifyTermModalProps) => {
    const fetcher: FetcherWithComponents<TermInterface> = useFetcher();

    const modifyTermNameRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

    const modifyTermNameFeedbackRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

    const [modifyTermNameValue, setModifyTermNameValue] = useState(props.name);

    const [modifyTermNameInvalid, setModifyTermNameInvalid] = useState(false);

    const resetValidation = () => {
        setModifyTermNameInvalid(false);
        modifyTermNameFeedbackRef.current.innerHTML = "";
    };

    const handleClose = () => {
        resetValidation();
        props.handleClose();
    }

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
        evt.preventDefault();
        resetValidation();
        const validationErrors: [string, () => void][] = [];
        if (!modifyTermNameRef.current.value.trim().length) {
            validationErrors.push([
                "Le nom ne doit pas être vide.",
                () => setModifyTermNameInvalid(true),
            ]);
        }
        if (validationErrors.length) {
            modifyTermNameFeedbackRef.current.innerHTML = validationErrors
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
            <fetcher.Form action="/term/modify" method="PUT" onSubmit={ (evt) => handleSubmit(evt) }>
                <Modal.Body>
                    <Form.Group controlId="modifyTermName">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            name="modifyTermName"
                            placeholder="Ex: CSS, PHP, Git..."
                            autoFocus
                            value={ modifyTermNameValue }
                            onChange={ (evt) => setModifyTermNameValue(evt.target.value) }
                            onInput={ () => setModifyTermNameInvalid(false) }
                            isInvalid={ modifyTermNameInvalid }
                            ref={ modifyTermNameRef } />
                        <Form.Control.Feedback type="invalid" ref={ modifyTermNameFeedbackRef } />
                    </Form.Group>
                    <Form.Control type="hidden" name="modifyTermId" value={ props.id } autoFocus />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Enregistrer
                    </Button>
                </Modal.Footer>
            </fetcher.Form>
        </Modal>
    );
}

export default ModifyTermModal;
