import "./saveButton.css"

const SaveButton = ({handleClose}) => {
    return (
        <button className="btn-check" type="submit" aria-label="Confirm" onClick={handleClose}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="4.5 12.5 9.5 17.5 19.5 7.5" />
            </svg>
        </button>
    )
}

export default SaveButton