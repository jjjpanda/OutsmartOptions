import * as struct from '../../../src/jsLib/structuresEditingLibrary';

describe('Testing Structures Editing', () => {
    it('Test Map to Object', () => {
        expect(struct.mapToObject(
            [['a',1],['b',2],['c',3],['d',4]]
        )).toMatchObject({
            a:1,
            b:2,
            c:3,
            d:4
        })
    })
    
    it('Test Nested Object to Map', () => {
        expect(struct.objectToMap({
            a:{p:100, q:30},
            b:{p:100, q:60},
            c:{p:100, q:90},
            d:{p:100, q:80}
        })).toMatchObject([
            [ 'a', [ ['p',100], ['q',30] ] ],
            [ 'b', [ ['p',100], ['q',60] ] ],
            [ 'c', [ ['p',100], ['q',90] ] ],
            [ 'd', [ ['p',100], ['q',80] ] ]
        ])
    })
})