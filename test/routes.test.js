const expect = require('chai').expect; // eslint-disable-line
const httpMocks = require('node-mocks-http'); // eslint-disable-line

const routeLogic = require('../routes/routeLogic');

describe('routeLogic test method testing', () => {
  it('should run test method and return response', () => {
    const res = httpMocks.createResponse();
    const req = httpMocks.createRequest({
      body: {
        hello: 'generator'
      },
      headers: {
        'harmony-access-key': '123456',
        'harmony-request-id': '9876543'
      },
      log: { info(msg) {}, error(msg) {} }
    });
    return routeLogic.test(req, res, (err, result) => {
      console.log(err, result);
      expect(result.status).to.equal(200);
    });
  });
});
