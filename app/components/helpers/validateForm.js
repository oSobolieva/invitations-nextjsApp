
module.exports = function validateForm(value, type) {
      if (value.trim() == '') {
            return { error: true, text: 'Поле не може бути пустим!' };
      }

      switch (type) {
            case 'text':
                  if (!/^[A-z'-]+$/.test(value)) {
                        return { error: true, text: 'Цьому полю потрібен текст' };
                  } else {
                        return { error: false, text: '' };
                  }
            case 'email':
                  if (!/[A-z0-9_.%+-]+@[a-z]+\.[a-z]{2,}$/.test(value)) {
                        return { error: true, text: 'Некоректний тип email' };
                  } else {
                        return { error: false, text: '' };
                  }
            case 'password':
                  if (!/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_-]+$/.test(value)) {
                        return { error: true, text: "потрібні латинські літери, мінімум 1 Велика літера та 1 цифра!\nпароль може мати лише знаки «_» та «-»."};
                  } else if (value.length < 8) {
                        return { error: true, text: 'Пароль повинен містити мінімум 8 символів' };
                  } else {
                        return { error: false, text: '' };
                  }
            default:
                  return { error: false, text: '' };
      }
   
}


