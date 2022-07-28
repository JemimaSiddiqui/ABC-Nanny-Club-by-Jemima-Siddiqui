export const getSavedBabysitterIds = () => {
  const savedBabysitterIds = localStorage.getItem('saved_babsitters')
    ? JSON.parse(localStorage.getItem('saved_babysitters'))
    : [];

  return savedBabysitterIds;
};

export const saveBabysitterIds = (babysitterIdArr) => {
  if (babysitterIdArr.length) {
    localStorage.setItem('saved_babysitters', JSON.stringify(babysitterIdArr));
  } else {
    localStorage.removeItem('saved_babysitters');
  }
};

export const removeBabysitterId = (babysitterId) => {
  const savedBabysitterIds = localStorage.getItem('saved_babysitters')
    ? JSON.parse(localStorage.getItem('saved_babysitters'))
    : null;

  if (!savedBabysitterIds) {
    return false;
  }

  const updatedSavedBabysitterIds = savedBabysitterIds?.filter((savedBabysitterId) => savedBabysitterId !== babysitterId);
  localStorage.setItem('saved_babysitters', JSON.stringify(updatedSavedBabysitterIds));

  return true;
};
