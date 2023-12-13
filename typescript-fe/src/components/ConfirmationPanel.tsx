import * as React from 'react';

function ConfirmationPanel({ setShowConfirmation, itemAdded, type }) {
  return (
    <div className="confirmation-panel">
      {itemAdded && <p className="confirmation-text">{itemAdded} added</p>}
      <button
        type="button"
        className="button button-confirmation"
        onClick={() => { setShowConfirmation(false); }}
      >
        Add another {type}
      </button>
    </div>
  );
}

export default ConfirmationPanel;
