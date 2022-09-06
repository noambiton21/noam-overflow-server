const tryCatchResError = async (req, res, next, func) => {
  try {
    return await func(req, res);
  } catch (error) {
    next(error);
  }
};

module.exports = tryCatchResError;
