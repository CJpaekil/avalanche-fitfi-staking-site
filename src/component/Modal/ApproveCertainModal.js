import Modal from "react-bootstrap/Modal";

const ApproveCertainModal = ({ open, onClose, setApproveOkValue, onOk, LockDuration }) => {
    const onConfirmBtn = () => {
        onClose();
        setApproveOkValue(true);
    }
    return (
        <Modal dialogClassName="modal-90w" show={open} onHide={onClose} centered>
            <div style={{ padding: "20px 25px", backgroundColor: "#2C2F36" }}>
                <div style={{ fontSize: "20px", fontWeight: "500", color: "white" }}>
                    {
                        LockDuration === "nonpassed" ? (<><span>Your lock time is not passed.</span>
                            <p>Are you sure to continue?</p></>) : (<p>Are you sure to continue?</p>)
                    }
                </div>
                <div style={{ marginTop: "25px", display: "flex", justifyContent: "end", fontSize: "20px", fontWeight: "500" }}>
                    <button style={{ padding: "5px 25px", backgroundColor: "white", color: "black", borderRadius: "5px" }} onClick={onClose}>Cancel</button>
                    <button style={{ padding: "5px 25px", backgroundColor: "#FFB449", color: "white", borderRadius: "5px", marginLeft: "20px" }} onClick={e => onOk()}>Ok</button>
                </div>
            </div>
        </Modal>
    )
}

export default ApproveCertainModal;