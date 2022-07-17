import { FormEvent, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { IconButton } from '../IconButton';
import { Button } from '../Button';
import { Snackbar } from '../Snackbar';

import CheckBadgeIcon from '../../assets/icons/check-badge.svg';

import { contactActions } from '../../constants/contactActions';

import styles from '../../styles/components/sections/Contact.module.css';

export const Contact: React.FC = () => {
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSendingEmail(true);
    setShowSnackbar(true);
    setSendingEmail(false);
    setTimeout(() => setShowSnackbar(false), 3000);

    // emailjs
    //   .sendForm(
    //     `${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`,
    //     `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}`,
    //     form.current as HTMLFormElement,
    //     `${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}`
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //       setSnackbarMessage('Email Sent! Thanks for reaching out.');
    //       setShowSnackbar(true);
    //       setSendingEmail(false);
    //       setTimeout(() => setShowSnackbar(false), 3000);
    //     },
    //     (error) => {
    //       setSnackbarMessage(error.text);
    //       setShowSnackbar(true);
    //       setSendingEmail(false);
    //       setTimeout(() => setShowSnackbar(false), 3000);
    //     }
    //   );
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
        <Button title='Send' loading={sendingEmail} type='submit' />
      </div>
      <Snackbar
        show={showSnackbar}
        icon={CheckBadgeIcon}
        message={snackbarMessage}
      />
    </form>
  );
};
