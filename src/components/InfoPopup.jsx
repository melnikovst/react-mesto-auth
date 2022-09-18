import { Link } from "react-router-dom"

const InfoPopup = ({isInfoPopupOpen, onHeaderBtnClick, setIsInfoPopupOpen, profileP}) => {

    const handleExit = () => {
        onHeaderBtnClick();
        setIsInfoPopupOpen(false);
    }

    return (
        <div className={`info ${isInfoPopupOpen ? 'info_open' : ''}`}>
            <p className="info__email">{profileP}</p>
            <Link to='/sign-in' className="info__link" onClick={handleExit}>Выйти</Link>
        </div>
    )
}

export default InfoPopup;