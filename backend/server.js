const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const { CognitoJwtVerifier } = require('aws-jwt-verify');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure AWS SDK
AWS.config.update({ region: 'us-east-1' }); // Update with your region
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Configure Cognito JWT Verifier
const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: 'us-east-1_h7spjYzkE', // Replace with your Cognito User Pool ID
  tokenUse: 'access', // Use 'access' or 'id' based on your setup
  clientId: '3ragmvhcf9finn1p38pu9bf9l5', // Replace with your Cognito App Client ID
});

// Middleware to verify JWT
const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const payload = await jwtVerifier.verify(token);
    req.user = payload; // Attach user info (e.g., sub) to request
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Root route for testing
app.get('/', (req, res) => {
  res.status(200).json({ message: 'InvisionConnect Referral API is running' });
});

// POST endpoint with authentication
app.post('/api/referrals', authenticateToken, async (req, res) => {
  const { referrerId, refereeEmail, referralCode } = req.body;
  if (req.user.sub !== referrerId) {
    return res.status(403).json({ error: 'Unauthorized: referrerId does not match user' });
  }

  const params = {
    TableName: 'invisionconnect-referrals',
    Item: {
      user_id: `${Date.now()}_${referrerId}`, // Matches table's partition key
      referrerId,
      refereeEmail,
      referralCode,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    },
  };

  try {
    await dynamoDB.put(params).promise();
    res.status(201).json({ message: 'Referral submitted', referralId: params.Item.user_id });
  } catch (error) {
    console.error('Error submitting referral:', error);
    res.status(500).json({ error: 'Failed to submit referral' });
  }
});

// GET endpoint with authentication
app.get('/api/referrals/:referrerId', authenticateToken, async (req, res) => {
  const { referrerId } = req.params;
  if (req.user.sub !== referrerId) {
    return res.status(403).json({ error: 'Unauthorized: referrerId does not match user' });
  }

  const params = {
    TableName: 'invisionconnect-referrals',
    IndexName: 'ReferrerIdIndex',
    KeyConditionExpression: 'referrerId = :referrerId',
    ExpressionAttributeValues: {
      ':referrerId': referrerId,
    },
  };

  try {
    const data = await dynamoDB.query(params).promise();
    res.status(200).json(data.Items);
  } catch (error) {
    console.error('Error fetching referrals:', error);
    res.status(500).json({ error: 'Failed to fetch referrals' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));