
import dog from '@/public/dog.png'
import fox from '@/public/fox.png'
import koala from '@/public/koala.png'
import leopard from '@/public/leopard.png'
import tiger from '@/public/tiger.png'
import vdr from '@/public/vdr.png'
import zebra from '@/public/zebra.png'

const images = [dog, fox, koala, leopard, tiger, vdr, zebra];


export default function avatarRandomizer() {
    const randomIndexImages = Math.floor(Math.random() * images.length);

    return images[randomIndexImages].src;
}