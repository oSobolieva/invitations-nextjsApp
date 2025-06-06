/**
 * Головна сторінка стартового екрана застосунку.
 * 
 * Використовує React.lazy для асинхронного завантаження компоненту EntryButtons.
 * 
 * @component
 * @returns {JSX.Element} Компонент стартової сторінки.
 */
import React, { Suspense } from 'react';

const EntryButtons = React.lazy(() => import('./EntryButtons'));


export default function Start(){

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <link rel="preload" as="image" href="../../public/starting-page.png"></link>
            <div className = 'start-container'>
                <h1>Привіт від 'Invitations'!</h1>
                <p>Увійдіть або зареєструйтеся, щоб створити нове запрошення &#128516;</p>
                <EntryButtons/>
            </div>
            <section className = 'start-section'>
                <h2>Що таке 'Invitations' і для чого?</h2>
                <p>Привіт! &#128150; У нас новий додаток 'Invitations', де ви можете створити нову подію та запросити на неї друзів!
            При створенні нового заходу ви вказуєте всі необхідні дані,такі як назва, дата, час, опис, дрес-код.
            Після створення події ви можете редагувати її та повторно надсилати лист з новою інформацією.
            Електронні адреси ваших друзів можна зручно додавати, зберігати та редагувати вручну!</p>
                <p>Сподіваємось це допоможе вам створити яскраві події та спогади з вашими друзями та рідними!</p>
            </section>
        </Suspense>
    )
}
