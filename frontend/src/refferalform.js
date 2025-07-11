import React, { useState } from 'react';
import { Amplify, Auth, API } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

const ReferralForm = () => {
  const [refereeEmail, setRefereeEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.accessToken.jwtToken;
      const referrerId = user.attributes.sub; // Cognito user ID

      const response = await API.post('referralApi', '/referrals', {
        headers: { Authorization: `Bearer ${token}` },
        body: { referrerId, refereeEmail, referralCode },
      });

      setMessage(`Referral submitted! ID: ${response.referralId}`);
    } catch (error) {
      console.error('Error submitting referral:', error);
      setMessage('Failed to submit referral');
    }
  };

  return (
    <div>
      <h2>Submit a Referral</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={refereeEmail}
          onChange={(e) => setRefereeEmail(e.target.value)}
          placeholder="Referee Email"
          required
        />
        <input
          type="text"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          placeholder="Referral Code"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReferralForm;