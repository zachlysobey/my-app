import React from 'react'
import './App.css'

import b$ from 'blockstack'

const App: React.FC = () => {
  const appConfig = new b$.AppConfig()
  const userSession = new b$.UserSession({ appConfig })
  
  const isUserSignedIn = userSession.isUserSignedIn()
  const isSignInPending = userSession.isSignInPending()
  
  // TODO get rid of this somehow?
  function reloadPage() {
    window.location = window.location.origin as any
  }

  if (isSignInPending) {
    console.log('sign in pending')
    userSession.handlePendingSignIn()
      .then(x => {
        console.log('pending sign-in handled', x)
        reloadPage()
      })
  }

  if (isUserSignedIn) {
    const userData = userSession.loadUserData()
    console.log('signed in', )
    return (
      <>
        <p>Signed In</p>
        <pre>
          <code>{JSON.stringify({ userData }, null, 2)}</code>
        </pre>
        <button onClick={() => {
          userSession.signUserOut()
          reloadPage()
        }}>
          sign out
        </button>
      </>
    )
  }

  return (
    <button onClick={() => userSession.redirectToSignIn()}>
      sign in
    </button>
  )
}

export default App
