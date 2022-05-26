import Modal from "react-bootstrap/Modal";

const StakingModal = ({ open, onClose, amount, onConfirm }) => {
    const onConfirmBtn = () => {
        onClose();
        onConfirm();
    }
    return (
        <Modal dialogClassName="modal-90w" show={open} onHide={onClose} centered>
            <div style={{ padding: "20px 25px", backgroundColor: "#2C2F36" }}>
                <div style={{ fontSize: "20px", fontWeight: "500", color: "white" }}>
                    <span>Deposit Amount:</span>
                    <span style={{ marginLeft: "15px", fontWeight: "700" }}>{amount}</span>
                    <span style={{ marginLeft: "5px" }}>Fitfi</span>
                </div>
                <div style={{ marginTop: "25px", display: "flex", justifyContent: "end", fontSize: "20px", fontWeight: "500" }}>
                    <button style={{ padding: "5px 25px", backgroundColor: "white", color: "black", borderRadius: "5px" }} onClick={onClose}>Close</button>
                    <button style={{ padding: "5px 25px", backgroundColor: "#FFB449", color: "white", borderRadius: "5px", marginLeft: "20px" }} onClick={e => onConfirmBtn()}>Confirm</button>
                </div>
            </div>
        </Modal>
    )
}

export default StakingModal;