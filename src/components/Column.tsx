import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col } from "react-bootstrap";
import { useDrop } from "react-dnd";
import { type CardInterface } from "../model/Card";
import { type ColumnInterface } from "../model/Column";
import MemoCard from "./MemoCard";

interface ColumnProps {
    cards: CardInterface[];
    handleOpenModal: (column: ColumnInterface) => void;
}

interface DropResult {
    hovering: boolean;
    canDrop: boolean;
}

const Column = (props: ColumnInterface & ColumnProps) => {
    const [{ hovering, canDrop }, drop] = useDrop<Partial<CardInterface>, Partial<ColumnInterface>, DropResult>(() => ({
        accept: "card",
        drop: () => ({ id: props.id }),
        collect: (monitor) => ({
            hovering: monitor.isOver(),
            canDrop: monitor.canDrop() && (monitor.getItem().column !== props.id),
        }),
    }));

    return (
        <>
            <Col className="mb-1" md>
                <div className="row mb-2 align-items-baseline">
                    <div className="col-2 d-flex justify-content-start">
                        <Button variant="success" size="sm" onClick={ () => props.handleOpenModal(props) }>
                            <FontAwesomeIcon icon={ faPlus }></FontAwesomeIcon>
                        </Button>
                    </div>
                    <p className="col h5">{ props.label }</p>
                </div>
                <div className="row flex-column g-2">
                    { canDrop &&
                        <Card body
                            className={ `drop-zone bg-warning-subtle py-2 border-3 ${hovering ? "hovering" : ""}` }
                            ref={drop}>Déplacer ici.</Card>
                    }
                    { props.cards.map((card) =>
                        <MemoCard key={ card.id } { ...card } />
                    ) }
                </div>
            </Col>
        </>
    );
}

export default Column;
