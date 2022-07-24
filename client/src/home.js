import Card from './context';
import bank from './bank.png';

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url("https://static.wikia.nocookie.net/overlordmaruyama/images/c/c4/Treasury_%28Mass_for_the_Dead%29.png/revision/latest/scale-to-width-down/875?cb=20200731014636")`,
        height: '92.4vh',
        padding: '10px',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div style={{ padding: '20px' }}>
        <Card
          txtcolor='black'
          header='Full Bank Landing Module'
          title="Welcome to DooHee's Treasury"
          text='You can move around using the navigation bar.'
          body={<img src={bank} className='img-fluid' alt='Responsive image' />}
        />
      </div>
    </div>
  );
}
