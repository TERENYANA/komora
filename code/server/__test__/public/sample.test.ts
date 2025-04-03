
/*
describe permet de regrouper des tests 
it permet d'écrir un test 
expect permet de créer une assertion
*/
import {describe,it,expect} from 'vitest';

describe("tests suite",()=>{
//créer un test
it ("my addition works",()=>{
//assert
expect(1+1).toBe(2);
expect(1+1).not.toBe(3);
});
});