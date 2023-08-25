import { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFetcher, type FetcherWithComponents } from "react-router-dom";
import { type TermInterface } from "../model/Term";

interface AddTermModalProps {
    show: boolean;
    handleClose: () => void;
}

const AddTermModal = (props: AddTermModalProps) => {
    const fetcher: FetcherWithComponents<TermInterface> = useFetcher();

    const addTermNameRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

    const addTermNameFeedbackRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

    const [addTermNameInvalid, setAddTermNameInvalid] = useState(false);

    const resetValidation = () => {
        setAddTermNameInvalid(false);
        addTermNameFeedbackRef.current.innerHTML = "";
    };

    const handleClose = () => {
        resetValidation();
        props.handleClose();
    };

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
        evt.preventDefault();
        resetValidation();
        const validationErrors: [string, () => void][] = [];
        if (!addTermNameRef.current.value.trim().length) {
            validationErrors.push([
                "Le nom ne doit pas être vide.",
                () => setAddTermNameInvalid(true),
            ]);
        }
        if (validationErrors.length) {
            addTermNameFeedbackRef.current.innerHTML = validationErrors
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
                <Modal.Title>Nouvelle thématique</Modal.Title>
            </Modal.Header>
            <fetcher.Form action="/term/add" method="POST" onSubmit={ (evt) => handleSubmit(evt) }>
                <Modal.Body>
                    <Form.Group controlId="addTermName">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            name="addTermName"
                            placeholder="Ex: CSS, PHP, Git..."
                            autoFocus
                            onInput={ () => setAddTermNameInvalid(false) }
                            isInvalid={ addTermNameInvalid }
                            ref={ addTermNameRef } />
                        <Form.Control.Feedback type="invalid" ref={ addTermNameFeedbackRef } />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Ajouter
                    </Button>
                </Modal.Footer>
            </fetcher.Form>
        </Modal>
    );
};

export default AddTermModal;
