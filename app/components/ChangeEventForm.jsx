

export default function ChangeEventForm({information, closeEventInfo}) {
    
    function handleSubmit(e) {
        e.preventDefault;

        const formData = new FormData(e.currentTarget);

        if (fieldsNotEmpty(formData)) {
            //send to DB
        }
    }

    function fieldsNotEmpty(form) {
        return form.get('title').trim() !== '' &&
            form.get('dresscode').trim() !== '' &&
            form.get('description').trim() !== '' &&
            form.get('location').trim() !== '' &&
            form.get('date').trim() !== '' &&
            form.get('time').trim() !== '';
    }

    return (
        <form className='event_information' onSubmit={handleSubmit}>
            <div className = 'event_information__header'>
                <label>
                    Title: 
                    <input type='text' name='title' value={information.title} />
                </label>
                <button onClick={closeEventInfo}>X</button>
            </div>
            <label>
                Type: 
                <select name='type'>
                    <option selected="selected">{information.type}</option>
                    <option>Party</option>
                    <option>After-party</option>
                    <option>Sex-party</option>
                    <option>Funeral</option>
                    <option>Wedding</option>
                    <option>Birthday</option>
                </select>
            </label>
            <label>
                Dress-code: 
                <input type='text' name='dresscode' value={information.dresscode} />
            </label>
            <label>
                Description: 
                <input type='text' name='description' value={information.description} />
            </label>
            <label>
                Date: 
                <input type='date' name='date' value={information.date} />
            </label>
            <label>
                Time: 
                <input type='time' name='time' value={information.time} />
            </label>
            <label>
                Location: 
                <input type='text' name='location' value={information.location} />
            </label>
        </form>
    )
}

