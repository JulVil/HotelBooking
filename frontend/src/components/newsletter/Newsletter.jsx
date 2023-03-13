import './newsletter.scss';

const Newsletter = () => {
  return (
    <div className='newsletter'>
      <div className='newsletterContainer'>
        <div className='newsletterTitle'>
          <h1>Save time, save money!</h1>
          <span>Sign up and we'll sned the best deals to you</span>
        </div>
        <div className='newsletterInputContainer'>
          <input type='text' placeholder='Your email address' required />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
