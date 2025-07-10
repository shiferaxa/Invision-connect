import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <BrowserRouter>
      <Authenticator>
        {({ signOut, user }) => (
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1>InvisionConnect</h1>
                  <p>Welcome, {user.username}</p>
                  <button onClick={signOut}>Sign out</button>
                </div>
              }
            />
          </Routes>
        )}
      </Authenticator>
    </BrowserRouter>
  );
}

export default App;