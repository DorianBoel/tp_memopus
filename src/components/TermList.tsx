import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef } from "react";
import { Button, Dropdown, Table } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { TermInterface } from "../model/Term";

const TermList = () => {
    const terms: TermInterface[] = useLoaderData() as TermInterface[];

    const toggleOptions = forwardRef(({ children, onClick }: any, ref) => (
        <span onClick={ (e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick(e);
        } }>{ children }</span>
    ));

    const nav = (term: TermInterface) => {
        console.log(term.name);
    };

    return (
        <>
            <div className="row mb-1">
                <p className="h3 col-11 mb-0">Liste des thématiques</p>
                <div className="col d-flex justify-content-end">
                    <Button variant="success">
                        <FontAwesomeIcon icon={ faPlus }></FontAwesomeIcon>
                    </Button>
                </div>
            </div>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th className="d-flex justify-content-between pe-1">
                            Thématique
                            <Button variant="success" size="sm">+</Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { terms.map((term) =>
                        (<tr key={ term.id }>
                            <td className="term-td d-flex justify-content-between" onClick={ () => nav(term) }>
                                <span className="text-primary">{ term.name }</span>
                                <Dropdown drop="start">
                                    <Dropdown.Toggle as={ toggleOptions } id="dropdown-basic">
                                        <FontAwesomeIcon className="text-secondary mt-1" icon={ faGear } size="lg" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                            Action
                                        </Dropdown.Item>
                                        <Dropdown.Item>Another action</Dropdown.Item>
                                        <Dropdown.Item>Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>)
                    ) }
                </tbody>
            </Table>
        </>
    );
}

export default TermList;
