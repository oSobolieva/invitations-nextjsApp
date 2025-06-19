/**
     * Відправляє запрошення друзям.
     * 
     * @param {Object} eventDetails - Деталі заходу.
     */
export async function sendInvitations({ eventDetails, friendsEmails, letterType, userName, email }){
    let message;

    switch (letterType){
        case "create":
            message = `Привіт! Пише ${userName}. Запрошую вас на ${eventDetails.title}!\n
            ${eventDetails.description}\n
            Бажано дотриматися дрескоду: ${eventDetails.dresscode}.\n
            День: ${eventDetails.date}\n
            Час: ${eventDetails.time}\n
            Місце: ${eventDetails.location}\n
            \n
            З нетерпінням чекаю!`;
            break; 
        case "update":
            message = `Привіт! Пише ${userName}. Хочу попередити, що дані запрошення на ${eventDetails.title} зазнали змін. Прочитайте 
            уважно інформацію нижче та візміть до уваги зміни:
            ${eventDetails.description}
            Бажано дотриматися дрескоду: ${eventDetails.dresscode}.
            День: ${eventDetails.date}
            Час: ${eventDetails.time}
            Місце: ${eventDetails.location}
            
            З нетерпінням чекаю!`;
            break; 
        case "cancel":
            message = `Привіт! Це я - ${userName}. Хочу попередити, що я ВІДМІНЯЮ ${eventDetails.title}, що мало бути 
            ${eventDetails.date} у ${eventDetails.location}.
            На жаль мої плани трохи змінилися, проте я обов'язково попереджу вас, якщо знову організую!`;
            break; 
    }

    const res = await fetch('/api/send-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendsEmails, userName, email, message }),
    });

    if (!res.ok) {
        throw new Error(`Помилка сервера: ${res.status}`);
    }
      
    const text = await res.text();
      
    let result;
    try {
        result = JSON.parse(text);
    } catch (e) {
        throw new Error('Server respond is not a valid JSON');
    }

    return result;        
};