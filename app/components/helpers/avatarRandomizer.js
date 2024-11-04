
const dog = '../../../public/dog.png'
const fox = '../../../public/fox.png'
const koala = '../../../public/koala.png'
const leopard = '../../../public/leopard.png'
const tiger = '../../../public/tiger.png'
const vdr = '../../../public/vdr.png'
const zebra = '../../../public/zebra.png'

const images = [dog, fox, koala, leopard, tiger, vdr, zebra];


module.exports = function avatarRandomizer() {
    const randomIndexImages = Math.floor(Math.random() * images.length);

    return images[randomIndexImages];
}


//return images[randomIndexImages].src;