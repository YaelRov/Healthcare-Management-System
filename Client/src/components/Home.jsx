import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Home() {
  let { id } = useParams();
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const curUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (curUser === null || curUser.id != id) {
      window.history.replaceState(null, '', '/');
      navigate('/login', { replace: true });
    }
    else
      setCurrentUser(curUser);
  }, [])
  return (
    <>
      <h2>Hello, {currentUser.username}.</h2>
      <h2>What would you like to see?</h2>
    </>
  )
}