import treeWalk from '../src/index';

const catFamilies = {
  name: '大猫',
  children: [{
    name: '小猫1',
    children: [{
      name: '小小猫1',
    }, {
      name: '小小猫2',
    }, {
      name: '小小猫3',
    }, {
      name: '小小猫4',
    }],
  }, {
    name: '小猫2',
  }, {
    name: '小猫3',
  }, {
    name: '小猫4',
  }],
};

treeWalk.deep(catFamilies, {
  process(cat) {
    console.log(cat);
  },
});
