import { Button, Card } from "react-bootstrap";
import { CardInterface } from "../model/Card";
import { useState } from "react";

const MemoCard = (props: CardInterface) => {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <Card body>
            <Card.Title className="h6">
                { props.question } ?
            </Card.Title>
            <Button variant="secondary" size="sm" onClick={ () => setShowAnswer((val) => !val) }>
                { showAnswer ? "Masquer" : "Afficher"} la réponse
            </Button>
            <Card.Text>
                { showAnswer && props.answer }
            </Card.Text>
        </Card>
    );
};

export default MemoCard;
