import expect from 'expect';
import User from '../src/post';

const user = new User();

describe('When a digitized book supplied as a JSON Array is passed in', () => {
  it('should return true for valid JSON ', () => {
    expect(user.signin).toBe(true);
  });
  it('should return Book is Empty if an empty book is passed ', () => {
    expect(() => { }).toThrow('Book is Empty');
  });
  it('should return File is Malformed if a Malformed book is passed ', () => {
    expect(() => {}).toThrow('File is malformed');
  });
  it('should return An Invalid JSON Object if an Invalid JSON array is passed  ', () => {
    expect(() => {}).toThrow('Invalid JSON Array');
  });
});

describe('When a digitized book supplied as a JSON Array is passed in', () => {
  it('should return true for valid JSON ', () => {
    expect().toBe(true);
  });
  it('should return Book is Empty if an empty book is passed ', () => {
    expect(() => {}).toThrow('Book is Empty');
  });
  it('should return File is Malformed if a Malformed book is passed ', () => {
    expect(() => {}).toThrow('File is malformed');
  });
  it('should return An Invalid JSON Object if an Invalid JSON array is passed  ', () => {
    expect(() => {}).toThrow('Invalid JSON Array');
  });
});
