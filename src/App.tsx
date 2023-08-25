import { Container } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet } from "react-router-dom";
import "./App.css";
import MainHeader from "./components/MainHeader";

function App() {
    return (
            <div className="App">
                <DndProvider backend={ HTML5Backend }>
                    <MainHeader />
                    <main>
                        <Container className="py-4">
                            <Outlet />
                        </Container>
                    </main>
                {/* <MainFooter></MainFooter> */}
                </DndProvider>
            </div>
    );
}

export default App;
