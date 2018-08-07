const nock = require('nock');
const fs = require('fs');
const {expect} = require('chai');
const service = require('../source');

const sample = fs.readFileSync('./test/data/sample.html');

describe('fetch', () => {
  beforeEach(() => {
    this.server = nock('https://free-proxy-list.net');
  });
  afterEach(() => nock.cleanAll());

  it('should return a list of proxies', () => {
    this.server.get('/').reply(200, sample);
    return service.fetch().then((res) => {
      expect(this.server.isDone()).to.eql(true);
      expect(res).to.be.an('array');
      res.forEach((item) => {
        expect(item).to.have.property('host');
        expect(item).to.have.property('port');
        expect(item).to.have.property('country');
        expect(item).to.have.property('level');
        expect(item).to.have.property('https');
      });
      expect(res[0]).to.have.property('host', '84.242.74.100');
      expect(res[0]).to.have.property('port', '8080');
      expect(res[0]).to.have.property('country', 'CZ');
      expect(res[0]).to.have.property('level', 0);
      expect(res[0]).to.have.property('https', false);
    });
  })
});
