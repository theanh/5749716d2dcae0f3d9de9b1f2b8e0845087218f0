const handleSuccess = data => {
  return {
    status: 'ok',
    data
  };
};

const handleError = error => {
  return {
    status: 'false',
    error
  };
};

module.exports = { handleSuccess, handleError };
