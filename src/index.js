// import _ from 'lodash';
import join from 'lodash/join';
import { add } from './add';
import { sub } from './sub';
import './index.css';

const addResult = add(56 + 211);
const subResult = sub(213 - 53);
// console.log(_.join([addResult, subResult], '---'));
console.log(join([addResult, subResult], '---'));

const box = document.createElement('div');
box.innerText = 'compare hash';
document.body.append(box);
