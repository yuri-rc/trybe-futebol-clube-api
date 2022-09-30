const httpErrors = (httpError: number) => {
  switch (httpError) {
    case 400:
      return 'All fields must be filled';
    case 401:
      return 'Incorrect email or password';
    case 200:
    default:
  }
};

export default httpErrors;
