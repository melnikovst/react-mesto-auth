import PopupWithForm from './PopupWithForm';

export interface ISubmitDeletingProps {
  isOpen: boolean;
  onClose: () => void;
  onCardDelete: any;
  isDeletedCardLoading?: boolean;
  closeByOverlay: (e: MouseEvent) => void;
}

const SubmitDeletingCard: React.FC<ISubmitDeletingProps> = ({
  isOpen,
  onClose,
  onCardDelete,
  isDeletedCardLoading,
  closeByOverlay,
}) => {
  const handleDeleteClick = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    onCardDelete();
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="submit"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleDeleteClick}
      btnText={`${isDeletedCardLoading ? 'Удаляется...' : 'Удалить'}`}
      closeByOverlay={closeByOverlay}
      onCardDelete={handleDeleteClick}
    />
  );
};

export default SubmitDeletingCard;
