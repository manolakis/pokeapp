import { expect } from '@open-wc/testing';
import sinon from 'sinon';

import { CachedProviderMixin } from '../../src/providers/CachedProviderMixin.js';

class TestDataProvider {
  request() {}
}

describe('CachedProviderMixin', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should execute the first request to a url', async () => {
    const stub = sandbox.stub(TestDataProvider.prototype, 'request').callsFake(() => ({}));
    const provider = new (CachedProviderMixin(TestDataProvider))();

    await provider.request({ method: 'get', url: '/test/1' });
    await provider.request({ method: 'get', url: '/test/2' });

    expect(stub.calledTwice).to.be.true;
  });

  it('should create different cache entries for the same url with different query params', async () => {
    const stub = sandbox.stub(TestDataProvider.prototype, 'request').callsFake(() => ({}));
    const provider = new (CachedProviderMixin(TestDataProvider))();

    await provider.request({ method: 'get', url: '/test', params: { q: 1 } });
    await provider.request({ method: 'get', url: '/test', params: { q: 2 } });

    expect(stub.calledTwice).to.be.true;
  });

  it('should return the cached value if match', async () => {
    const stub = sandbox.stub(TestDataProvider.prototype, 'request').callsFake(() => ({}));
    const provider = new (CachedProviderMixin(TestDataProvider))();

    const response1 = await provider.request({ method: 'get', url: '/test' });
    const response2 = await provider.request({ method: 'get', url: '/test' });

    expect(stub.calledOnce).to.be.true;
    expect(response1 === response2).to.be.true;
  });

  it('should invalidate the cache when `invalidateCache` is called', async () => {
    const stub = sandbox.stub(TestDataProvider.prototype, 'request').callsFake(() => ({}));
    const provider = new (CachedProviderMixin(TestDataProvider))();

    const response1 = await provider.request({ method: 'get', url: '/test' });
    provider.invalidateCache();
    const response2 = await provider.request({ method: 'get', url: '/test' });

    expect(stub.calledTwice).to.be.true;
    expect(response1 === response2).to.be.false;
  });
});
