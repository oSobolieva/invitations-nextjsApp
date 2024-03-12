import Image from 'next/image'
import okay from '../../public/succ.png'
import wrong from '../../public/wr.png'

export default function Success({backMenu}) {
    
    return (
        <>
            <Image src={okay} className = 'modal-img' width='80' height='75' alt='sign'/>
            <h1 className = 'modal-title'>Success!</h1>
            <p className = 'modal-text'>An invitation has been sent to all users.</p>
            <button onClick = {backMenu}>Back</button>
        </>
    )
}