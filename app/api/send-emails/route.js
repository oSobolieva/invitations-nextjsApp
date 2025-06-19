import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request) {
    const body = await request.json();

    const msg = {
        to: body.friendsEmails,
        from: 'sasha_364@ukr.net',
        subject: `Запрошення від ${body.userName}`,
        text: body.message,
        html: `<p>${body.message.replace(/\n/g, '<br>')}</p><p>Відповісти: ${body.email}</p>`,
        replyTo: body.email,
    };

    try {
        await sgMail.sendMultiple(msg);
        return Response.json({ success: true });
    } catch (error) {
        console.error('SendGrid error:', error.response?.body || error);
        return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
            status: 500,
        });
    }
}



