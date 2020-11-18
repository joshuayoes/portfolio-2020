import React, { useState } from "react"
import style from './EmailSignUp.module.scss';
import addToMailchimp from 'gatsby-plugin-mailchimp'
import background from './background.svg'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

interface Props {
  REFERRAL?: string;
}

const EmailSignUp: React.FC<Props> = ({ REFERRAL }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const target = e.target as typeof e.target & {
      email: { value: string; }
    }

    const { result, msg } = await addToMailchimp(target.email.value, { REFERRAL });
    
    setStatus(result);
    let message = 'Something went wrong 😔'
    if (result === 'success') {
      message = 'Success! Check your email to confirm 😊'
    }
    if (result === 'error' && msg.includes('already subscribed')) {
      message = 'You have already subscribed! Maybe check your spelling?'
    }
    if (result === 'error' && msg.includes('not valid')) {
      message = 'Not a valid email. Maybe check your spelling?'
    }

    toast(message, { type: result, position: "bottom-right" });
  }

  return (
    <form className={style.wrapper} onSubmit={handleSubmit} >
        <h3>Like this article?</h3>
        <p>Get emails when I write new articles! I'm on too many email lists myself, so I promise not to spam you.</p>
        <div className={style.form}>
          <label htmlFor="email"><h5>Email</h5></label>
          <input id="email" type="email" name="email" placeholder="you@probablygmail.com" disabled={status === 'loading'} required />
          <button type="submit" disabled={status === 'loading'}>Submit</button>
        </div>
        <img src={background} role="presentation" />
      </form>
  )
}

export default EmailSignUp
