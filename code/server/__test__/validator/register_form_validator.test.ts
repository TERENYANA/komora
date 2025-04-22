import {describe,it,expect} from 'vitest';
import RegisterFormValidator from "../../src/validator/register_form_validator"

 describe ('register from validator tests suite',()=>{
    it("should be valide",async()=>{
        //arrange
        const sut = new RegisterFormValidator();
        const expected= {
            firstname: 'MOMO',
            lastname: 'MOMO',
            email: 'MOMO6@gmail.com',
            password: 'MOMO.12345678',
            number: '0780158257',
            address: '1 rue du pin'
          };
        const body= {
            firstname: 'MOMO',
            lastname: 'MOMO',
            email: 'MOMO6@gmail.com',
            password: 'MOMO.12345678',
            number: '0780158257',
            address: '1 rue du pin'
          };
        //act
          const actual = await sut.isValid(body);
          console.log(actual);
        //assert
          expect(actual).toEqual(expected);
 });
 
 it("should be invalide",async()=>{
    //arrange
    const sut = new RegisterFormValidator();
    const body= {
        firstname: 'MOMO',
        lastname: 'MOMO',
        email: 'MOMO6gmail.com',
        password: 'MOMO.12345678',
        number: '0780158257',
        address: '1 rue du pin'
      };
    //act
      const actual = await sut.isValid(body);
    //assert
      expect(actual).toBeInstanceOf(Error);
});
 });