import success from '../images/icon-success.svg'
import fail from '../images/icon-fail.svg'
const InfoTooltip = ({isOk, isOpen, closeByOverlay, onClose}) => {

    return (
        <div onClick={closeByOverlay} className={`popup popup_type_register-info ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_tooltip">
                <button onClick={onClose} className="popup__button-escape"/>
                <img src={isOk ? success : fail} alt={isOk ? 'success-icon' : 'fail-icon'} className="popup__img"/>
                <p className='popup__title popup__title_type_tooltip'>{isOk ? 'Вы успешно зарегестрировались' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
            </div>
        </div>
    )
}  

export default InfoTooltip;