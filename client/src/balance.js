import React from 'react';
import { UserContext } from './App';
import Card from './context';

export default function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div
      style={{
        backgroundImage: `url("https://i.pinimg.com/originals/7d/1a/27/7d1a270b8e8d7ec108a0e4775147bbed.png")`,
        height: '92.4vh',
        padding: '40px',
      }}
    >
      <Card
        bgcolor='info'
        header='Balance'
        status={status}
        body={
          show ? (
            <BalanceForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <BalanceMsg setShow={setShow} setStatus={setStatus} />
          )
        }
      />
    </div>
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Great Success! Very Nice!</h5>
      <button
        type='submit'
        className='btn btn-light'
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}
      >
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const { user, setUser } = React.useContext(UserContext);

  function handle() {
    fetch(`/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus(text);
          props.setShow(false);
          setBalance(user.balance);
          console.log('JSON:', data);
        } catch (err) {
          props.setStatus(text);
          console.log('err:', text);
        }
      });
  }

  return (
    <>
      Email
      <br />
      <input
        type='input'
        className='form-control'
        placeholder='Enter email'
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      <button type='submit' className='btn btn-light' onClick={handle}>
        Check Balance
      </button>
    </>
  );
}
