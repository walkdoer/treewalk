import { h } from 'preact'; /** @jsx h */
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';
import Example from '../src/example';
chai.use(assertJsx);

// check if a given JSX DOM contains the given fragment:
expect(
	<div> <span>foo!</span> </div>
).to.contain(
	<span>foo!</span>
);


describe('Example Preact 测试', function() {
  describe('渲染测试', function() {
    it('<Example/>', function() {
      expect(<Example/>).to.deep.equal(<div><span>test</span></div>);
    });
    it('<Example id="1"/>', function() {
      expect(<Example id="1"/>).to.deep.equal(<div id="1"><span>test</span></div>);
    });
  });
});
