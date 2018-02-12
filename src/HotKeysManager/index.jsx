import "./HotKeysManager.less";
import _ from"lodash";
import HotKeysManager from "./HotkeysManager.jsx";
window.HotKeysManager = new HotKeysManager();
// export default HotKeysManager;

//_.isEqualWith('liz', 'LIZ', (vaule,other)=>{ return vaule.toLowerCase()=== other.toLowerCase();});

let arr = [{id:3},{id:2},{id:2},{id:2},{id:2},{id:2}];
let arr1=_.unionWith(arr,(x,y)=>{
    return x.id == y.id;
})
console.table(arr);

console.table(arr1);

var objects = [
    { 'a': { 'b': _.constant(2) } },
    { 'a': { 'b': _.constant(1) } }
  ];
   
  _.map(objects, _.method('a.b'));
  // => [2, 1]


  var date = new Date();
 // _.flow(setD)