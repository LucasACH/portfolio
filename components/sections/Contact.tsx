import axios from 'axios';
import { useState } from 'react';
import { Input } from '../Input';
import { TextArea } from '../TextArea';
import styles from '../../styles/components/sections/Contact.module.css';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { contactActions } from '../../constants/contactActions';

export const Contact: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const sendEmail = () => {
    axios
      .post('/api/email', {
        email: email,
        name: name,
        subject: subject,
        message: message,
      })
      .then((res) => console.log(res.data));
  };
  return (
    <div className={styles.container}>
      <Input
        type='text'
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder='Name'
      />
      <Input
        type='email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder='Email'
      />
      <Input
        type='text'
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
        placeholder='Subject'
      />
      <TextArea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder='Message'
      />
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
        <Button title='Send Message' onClick={sendEmail} />
      </div>
    </div>
  );
};
