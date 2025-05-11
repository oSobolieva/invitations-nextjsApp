
const dog = '/dog.png'
const fox = '/fox.png'
const koala = '/koala.png'
const leopard = '/leopard.png'
const tiger = '/tiger.png'
const vdr = '/vdr.png'
const zebra = '/zebra.png'

const images = [dog, fox, koala, leopard, tiger, vdr, zebra];


module.exports = function avatarRandomizer() {
    const randomIndexImages = Math.floor(Math.random() * images.length);

    return images[randomIndexImages];
}
