import React from "react";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import './ViewTypeButton.css'

function ViewTypeButton(props) {

    return (
        <Button
            variant="outline-primary"
            className="viewTypeButton"
            onClick={props.onClick}
        >
            <Icon size={1} path={props.icon} />
        </Button>
    );
}

export default ViewTypeButton;