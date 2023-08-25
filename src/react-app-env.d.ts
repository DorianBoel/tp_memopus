/// <reference types="react-scripts" />

export global {

    export namespace NodeJS {

        export interface ProcessEnv {
            REACT_APP_SERVER_URL: string;
            REACT_APP_USE_AUTH: "1" | "0";
        }

    }

    export type ReactUseState<T> = [T, React.Dispatch<React.SetStateAction<T>>];

}
