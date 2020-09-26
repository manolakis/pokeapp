import sinon from 'sinon';

console.log('mock loaded!');

export const stub = sinon.stub();

export class DataProvider {
  request(config) {
    return stub(config);
  }
}
