export interface IUserObject {
  name: string;
  about: string;
  avatar: string;
  _id: string;
  cohort: string;
}

export interface ICardObject {
  likes?: IUserObject[];
  link?: string;
  name: string;
  owner?: IUserObject;
  _id?: string;
}

interface ImagePopupProps {
  card: ICardObject;
  onClose: () => void;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ card, onClose }) => {
  console.log(card);
  return Object.keys(card).length !== 0 ? (
    <figure className="popup__image">
      <img
        src={card.link}
        alt={card.name}
        className="popup__image-item"
        onClick={(e) => e.stopPropagation()}
      />
      <figcaption className="popup__image-subtitle">{card.name}</figcaption>
      <button
        onClick={onClose}
        className="popup__button-escape popup__button-escape_image"
      />
    </figure>
  ) : null;
};

export default ImagePopup;
