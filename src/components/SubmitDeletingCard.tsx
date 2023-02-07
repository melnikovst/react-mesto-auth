import { iDefault } from './App';
import PopupWithForm from './PopupWithForm';

export interface ISubmitDeletingProps {
  isOpen: boolean;
  onClose: () => void;
  onCardDelete: (e: iDefault) => void;
  isDeletedCardLoading?: boolean;
  closeByOverlay: (e: React.MouseEvent<HTMLDivElement>) => void;
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
    onCardDelete(e);
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
