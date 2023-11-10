import {Button, OverlayTrigger, Popover} from "react-bootstrap";

function Confirmation(props) {

    const handleConfirm = () => {
        if (typeof props.onConfirm === "function") {
            props.onConfirm();
        }
    }

    const handleClose = () => document.body.click();

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{props.title}</Popover.Header>
            <Popover.Body>
                {props.message}
                <div className='d-flex flex-column gap-2 mt-3 w-100'>
                    <Button
                        variant='danger'
                        onClick={handleConfirm}
                    >
                        {props.confirmText}
                    </Button>

                    <Button
                        variant='light'
                        onClick={handleClose}
                    >
                        Zrušit
                    </Button>
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={popover}
                rootClose
            >
                {props.children}
            </OverlayTrigger>
        </>
    )
}

export default Confirmation;