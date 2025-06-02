import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    const body = await request.json();

  try {
    const data = await resend.emails.send({
      from: 'invite@resend.dev',
      to: body.friendsEmails,
      subject: `Запрошення від ${body.userName}`,
      html: `<p>${body.message}</p><p>Відповісти: ${body.email}</p>`,
      reply_to: body.email,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error during sending:', error);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
        status: 500,
    });
  }
}


