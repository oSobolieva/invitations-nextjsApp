import avatarRandomizer from '../components/helpers/avatarRandomizer';

// Мок для зображень
const images = [
    { src: '../../../public/dog.png' },
    { src: '../../../public/fox.png' },
    { src: '../../../public/koala.png' },
    { src: '../../../public/leopard.png' },
    { src: '../../../public/tiger.png' },
    { src: '../../../public/vdr.png' },
    { src: '../../../public/zebra.png' },
];


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
