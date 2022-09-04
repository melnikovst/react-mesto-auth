import PopupWithForm from "./PopupWithForm";

const SubmitDeletingCard = ({ isOpen, onClose, onCardDelete, isDeletedCardLoading }) => {

    const handleDeleteClick = (e) => {
        e.preventDefault();
        onCardDelete();
      }

    return (
            <PopupWithForm
              title="Вы уверены?"
              name="submit"
              onClose={onClose}
              isOpen={isOpen}
              onSubmit={handleDeleteClick}
              btnText={`${isDeletedCardLoading ? 'Грузимся...' : 'Удалить'}`}
            />
    )
} 

export default SubmitDeletingCard;