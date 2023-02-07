import { FC, ReactNode, useCallback, useEffect } from 'react';

interface PopupProps {
  children: ReactNode;
  isOpen: boolean;
  name: string;
  onClose: () => void;
  closeByOverlay: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Popup: FC<PopupProps> = ({
  children,
  isOpen,
  name,
  onClose,
  closeByOverlay,
}) => {
  const closeByEsc = useCallback(
    (evt: { key: string }) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', closeByEsc);
    }
    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, [closeByEsc, isOpen]);

  return (
    <div
      onClick={closeByOverlay}
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
    >
      {children}
    </div>
  );
};

export default Popup;
