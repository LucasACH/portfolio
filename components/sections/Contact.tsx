import { FormEvent, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { IconButton } from '../IconButton';
import { Button } from '../Button';

import { contactActions } from '../../constants/contactActions';

import styles from '../../styles/components/sections/Contact.module.css';

export const Contact: React.FC = () => {
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);

  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSendingEmail(true);

    emailjs
      .sendForm(
        `${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}`,
        form.current as HTMLFormElement,
        `${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}`
      )
      .then(
        (result) => {
          console.log(result.text);
          setSendingEmail(false);
        },
        (error) => {
          console.log(error.text);
          setSendingEmail(false);
        }
      );
  };
  return (
    <form className={styles.container} ref={form} onSubmit={sendEmail}>
      <Input type='text' name='from_name' placeholder='Name' required />
      <Input type='email' name='from_email' placeholder='Email' required />
      <Input type='text' name='subject' placeholder='Subject' required />
      <TextArea name='message' placeholder='Message' required />
      <div className={styles.actions}>
        <div className={styles.buttons}>
          {contactActions.map((action) => (
            <a
              key={action.key}
              href={action.href}
              target='_blank'
              rel='noreferrer'
            >
              <IconButton>
                <action.icon />
              </IconButton>
            </a>
          ))}
        </div>
        <Button title='Send' loading={sendingEmail} />
      </div>
    </form>
  );
};
