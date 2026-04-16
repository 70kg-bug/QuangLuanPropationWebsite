import "./btnCancel.css"

const CancelButton = ({handleClose}) => {
    return (
        <button className="btn-close" type="button" aria-label="Close" onClick={handleClose}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
        </button>
    )
}

export default CancelButton