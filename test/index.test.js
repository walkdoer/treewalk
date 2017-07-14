import { hello } from '../src/index';
import chai from 'chai';
const { expect } = chai;


describe('测试用例DEMO', function() {
  describe('#hello(msg)', function() {
    it('传入string', function() {
      expect(hello('world')).to.equal('hello world');
    });
  });
});
