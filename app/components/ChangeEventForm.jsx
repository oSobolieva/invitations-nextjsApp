

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
                    Назва: 
                    <input type='text' name='title' value={information.title} />
                </label>
                <button onClick={closeEventInfo}>X</button>
            </div>
            <label>
                Тип: 
                <select name='type'>
                    <option selected="selected">{information.type}</option>
                    <option>Вечірка</option>
                    <option>After-party</option>
                    <option>Гендерна вечірка</option>
                    <option>Поховання</option>
                    <option>Весілля</option>
                    <option>День народження</option>
                </select>
            </label>
            <label>
                Стиль одягу: 
                <input type='text' name='dresscode' value={information.dresscode} />
            </label>
            <label>
                Опис: 
                <input type='text' name='description' value={information.description} />
            </label>
            <label>
                Дата: 
                <input type='date' name='date' value={information.date} />
            </label>
            <label>
                Час: 
                <input type='time' name='time' value={information.time} />
            </label>
            <label>
                Локація: 
                <input type='text' name='location' value={information.location} />
            </label>
        </form>
    )
}

