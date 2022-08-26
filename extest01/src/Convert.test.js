import '@testing-library/jest-dom'
import {grade_switch} from './MxSystem';


describe('System Conversion Test', () => {
    test('Mx System Conversion', () => {
        expect(grade_switch(99)).toBe('A');
        expect(grade_switch(94)).toBe('A');
        expect(grade_switch(92)).toBe('A-');
        expect(grade_switch(88)).toBe('B+');
        expect(grade_switch(80)).toBe('B-');
        expect(grade_switch(74)).toBe('C');
        expect(grade_switch(30)).toBe('E');
        expect(grade_switch(0)).toBe('E');
        expect(grade_switch(100)).toBe('A');
        expect(grade_switch(-1)).toBe('');
        expect(grade_switch(101)).toBe('');
        expect(grade_switch(2)).toBe('E');

    });

});
