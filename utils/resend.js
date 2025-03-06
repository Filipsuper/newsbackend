import { Resend } from 'resend';
import { configDotenv } from "dotenv";

configDotenv()

const resend = new Resend();

export const createContact = async (params) => {
    const { email } = params

    try {
        const newContact = await resend.contacts.create({
            email: email,
            unsubscribed: false,
            audienceId: 'bd3e74b2-32a4-45dc-9418-30ea67989254',
        });
        console.log(newContact)

        if (newContact.error) {
            console.log(error)
        }
    } catch (error) {
        console.error(error)
    }
}

