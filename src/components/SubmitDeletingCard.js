import PopupWithForm from "./PopupWithForm";

const SubmitDeletingCard = ({ isOpen, onClose, onCardDelete, isDeletedCardLoading, closeByOverlay }) => {

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
              btnText={`${isDeletedCardLoading ? 'Удаляется...' : 'Удалить'}`}
              closeByOverlay={closeByOverlay}
            />
    )
} 

export default SubmitDeletingCard;