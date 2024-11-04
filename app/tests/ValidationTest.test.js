//import validateForm from '../components/helpers/validateForm';

const validateForm = require('../components/helpers/validateForm');


describe('validateForm', () => {
  test('should return error for empty value', () => {
    expect(validateForm('', 'text')).toEqual({ error: true, text: 'field must not be empty!' });
    expect(validateForm('', 'email')).toEqual({ error: true, text: 'field must not be empty!' });
    expect(validateForm('', 'password')).toEqual({ error: true, text: 'field must not be empty!' });
  });

  test('should validate text type correctly', () => {
    expect(validateForm('John', 'text')).toEqual({ error: false, text: '' });
    expect(validateForm('John Doe', 'text')).toEqual({ error: true, text: 'this field need a text' });
    expect(validateForm('John123', 'text')).toEqual({ error: true, text: 'this field need a text' });
  });

  test('should validate email type correctly', () => {
    expect(validateForm('example@example.com', 'email')).toEqual({ error: false, text: '' });
    expect(validateForm('invalid-email', 'email')).toEqual({ error: true, text: 'this is not the right email type' });
    expect(validateForm('example@domain', 'email')).toEqual({ error: true, text: 'this is not the right email type' });
  });

  test('should validate password type correctly', () => {
    expect(validateForm('Password1', 'password')).toEqual({ error: false, text: '' });
    expect(validateForm('password', 'password')).toEqual({ error: true, text: 'password need at least one capital letter and one number!\npassword can has \'_\' and \'-\' signs' });
    expect(validateForm('Password', 'password')).toEqual({ error: true, text: 'password need at least one capital letter and one number!\npassword can has \'_\' and \'-\' signs' });
    expect(validateForm('Pass1', 'password')).toEqual({ error: true, text: 'password must have more than 8 symbols!' });
  });

  test('should return no error for unsupported type', () => {
    expect(validateForm('any value', 'unsupported')).toEqual({ error: false, text: '' });
  });
});
