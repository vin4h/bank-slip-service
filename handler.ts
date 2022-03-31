
export const bankSlipService = async (event: any) => {
  if (event.http.method != 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: 'Method not allowed',
      }),
    }
  }
};
