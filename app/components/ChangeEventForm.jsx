/**
 * Форма редагування події.
 * 
 * Дозволяє користувачам оновлювати інформацію про подію, включаючи назву, тип, стиль одягу, опис, дату, час і локацію.
 * 
 * @component
 * @param {Object} props - Пропси компонента.
 * @param {Object} props.information - Поточна інформація про подію.
 * @param {string} props.information.title - Назва події.
 * @param {string} props.information.type - Тип події.
 * @param {string} props.information.dresscode - Дрес-код для події.
 * @param {string} props.information.description - Опис події.
 * @param {string} props.information.date - Дата події.
 * @param {string} props.information.time - Час події.
 * @param {string} props.information.location - Локація події.
 * @param {Function} props.closeEventInfo - Функція для закриття форми редагування.
 * @returns {JSX.Element} Форма редагування події.
 */

export default function ChangeEventForm({information, closeEventInfo}) {
    
    /**
     * Обробник надсилання форми. Перевіряє, чи всі поля заповнені, перед надсиланням даних.
     * 
     * @param {Event} e - Подія надсилання форми.
     */
    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (fieldsNotEmpty(formData)) {
            //send to DB
        }
    }

    /**
     * Перевіряє, чи всі необхідні поля форми заповнені.
     * 
     * @param {FormData} form - Дані форми.
     * @returns {boolean} `true`, якщо всі поля заповнені, інакше `false`.
     */
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

