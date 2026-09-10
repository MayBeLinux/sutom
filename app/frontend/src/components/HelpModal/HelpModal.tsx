import { CloseIcon } from "../icons/Icons";
import "./HelpModal.css";

type HelpModalProps = {
  onClose: () => void;
};

export default function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div className="help-overlay" onClick={onClose}>
      <div className="help-modal" onClick={(event) => event.stopPropagation()}>
        <div className="help-modal__header">
          <h2>Comment jouer</h2>
          <button type="button" className="help-modal__close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <ul className="help-modal__list">
          <li>Un mot est choisi aléatoirement, sa première lettre est révélée.</li>
          <li>Proposez un mot valide de la bonne longueur puis validez.</li>
          <li>
            <span className="help-swatch help-swatch--correct" /> une lettre
            bien placée.
          </li>
          <li>
            <span className="help-swatch help-swatch--present" /> une lettre
            présente mais mal placée.
          </li>
          <li>
            <span className="help-swatch help-swatch--absent" /> une lettre
            absente du mot.
          </li>
          <li>Vous disposez de 8 essais pour trouver le mot du jour.</li>
        </ul>
      </div>
    </div>
  );
}
