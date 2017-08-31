const errorResponseHandler = (res, status, message) => {
  return (
    res.status(status).json({
      message
    })
  );
};

export default errorResponseHandler;
