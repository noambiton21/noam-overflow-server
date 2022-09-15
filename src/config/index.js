const config = {
  expressPort: process.env.SERVER_PORT || 8000,
  httpStatuses: {
    created: 201,
    ok: 200,
    unauthorized: 403,
    badREquest: 400,
    notFound: 404,
    badInput: 413,
    internalServerError: 500,
  },
};

module.exports = { config };
