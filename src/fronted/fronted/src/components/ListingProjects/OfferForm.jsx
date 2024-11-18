import React, { useState } from 'react';

const OfferForm = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [budgetOffer, setBudgetOffer] = useState('');
  const [dateSubmission, setDateSubmission] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      description,
      budget_offer: budgetOffer,
      date_submission: dateSubmission,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Realizar Oferta</h2>

      <label className="block text-sm font-medium text-gray-700">Descripción</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mt-1 mb-4"
        rows="3"
        required
      />

      <label className="block text-sm font-medium text-gray-700">Monto de la Oferta</label>
      <input
        type="number"
        value={budgetOffer}
        onChange={(e) => setBudgetOffer(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mt-1 mb-4"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white w-full py-2 rounded-md font-semibold hover:bg-blue-700"
      >
        Enviar Oferta
      </button>
    </form>
  );
};

export default OfferForm;
