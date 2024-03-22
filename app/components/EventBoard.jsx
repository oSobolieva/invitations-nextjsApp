


export default function Event({information}) {
    function showDetails() {
        //show detail about Event in Portals
    }

    return (
        <button className='event' onClick={showDetails}>{information.title}</button>
    )
}