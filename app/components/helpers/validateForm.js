
module.exports = function validateForm(value, type) {
      if (value.trim() == '') {
            return { error: true, text: 'field must not be empty!' };
      }

      switch (type) {
            case 'text':
                  if (!/^[A-z'-]+$/.test(value)) {
                        return { error: true, text: 'this field need a text' };
                  } else {
                        return { error: false, text: '' };
                  }
            case 'email':
                  if (!/[A-z0-9_.%+-]+@[a-z]+\.[a-z]{2,}$/.test(value)) {
                        return { error: true, text: 'this is not the right email type' };
                  } else {
                        return { error: false, text: '' };
                  }
            case 'password':
                  if (!/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_-]+$/.test(value)) {
                        return { error: true, text: "password need at least one capital letter and one number!\npassword can has '_' and '-' signs"};
                  } else if (value.length < 8) {
                        return { error: true, text: 'password must have more than 8 symbols!' };
                  } else {
                        return { error: false, text: '' };
                  }
            default:
                  return { error: false, text: '' };
      }
   
}


