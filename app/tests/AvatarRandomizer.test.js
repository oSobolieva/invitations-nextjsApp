import avatarRandomizer from '../components/helpers/avatarRandomizer';


test('returns an image', () => {
  const result = avatarRandomizer();
  console.log('Result:', result); // Вывод результата для проверки
  expect(result).not.toBeUndefined(); // Проверка на отсутствие undefined
});

test('returns different images on subsequent calls', () => {
    let firstImage = avatarRandomizer();
    let isDifferent = false;

    // Перевіряємо, що при декількох спробах картинка змінюється
    for (let i = 0; i < 3; i++) {
        const newImage = avatarRandomizer();
        if (newImage !== firstImage) {
            isDifferent = true;
            break;
        }
        firstImage = newImage;
    }

    expect(isDifferent).toBe(true);
});
