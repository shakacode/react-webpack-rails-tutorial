import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function TestReactRouterRedirect() {
  const location = useLocation();

  function checkAuth() {
    // Hard code this to demonstrate the effect
    const notAuthorized = true;
    return notAuthorized;
  }

  if (checkAuth()) {
    return <Navigate to="/" state={{ redirectFrom: location.pathname }} />;
  }

  return <div>Nope.</div>;
}

export default React.memo(TestReactRouterRedirect);
