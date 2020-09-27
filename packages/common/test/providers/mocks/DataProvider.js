import sinon from 'sinon';

export const stub = sinon.stub();

export class DataProvider {
  request(config) {
    return stub(config);
  }
}
