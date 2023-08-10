import React from 'react';

function SubmitButton({ isLoading, label }) {
  return (
    <button
      type="submit"
      className={isLoading ? 'button button-submit disabled' : 'button button-submit'}
      disabled={isLoading}
    >
      {label}
    </button>
  );
}

export default SubmitButton;

