import React from "react";
import {LOADING} from "../helpers/const";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";

function Loader(props) {

    function getLoader() {
        switch (props.load.state) {
            case LOADING.PENDING:
                return (
                    <div className="loading">
                        <Icon size={2} path={mdiLoading} spin={true} />
                    </div>
                );
            case LOADING.ERROR:
                return (
                    <div className="error">
                        <div>Nepodařilo se načíst data.</div>
                        <br />
                        <pre>{JSON.stringify(props.load.error, null, 2)}</pre>
                    </div>
                );
            case LOADING.SUCCESS:
                return null;
            default:
                return null;
        }
    }

    return (
        <div>
            {getLoader()}
        </div>
    );
}

export default Loader;