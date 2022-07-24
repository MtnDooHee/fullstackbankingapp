import React from 'react';
import { UserContext } from './App';
import Card from './context';

export default function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div
      style={{
        backgroundImage: `url("https://c.wallhere.com/photos/14/23/1920x1080_px_coins_Meowth_money_pokemon-1708839.jpg!d")`,
        height: '92.4vh',
        padding: '40px',
      }}
    >
      <Card
        bgcolor='success'
        header='Withdraw'
        status={status}
        body={
          show ? (
            <WithdrawForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <WithdrawMsg setShow={setShow} setStatus={setStatus} />
          )
        }
      />
    </div>
  );
}

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type='submit'
        className='btn btn-light'
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}
      >
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const { user, setUser } = React.useContext(UserContext);

  function handle() {
    fetch(`/account/update/${email}/-${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus(text);
          props.setShow(false);
          setAmount(user.amount);
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
      Amount
      <br />
      <input
        type='number'
        className='form-control'
        placeholder='Enter amount'
        min='1'
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      <button type='submit' className='btn btn-light' onClick={handle}>
        Withdraw
      </button>
    </>
  );
}
