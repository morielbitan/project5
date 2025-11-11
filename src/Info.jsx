import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";

function Info() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem("userInfo");
    if (User) {
      setUserInfo(JSON.parse(User));
    } else {
      navigate("/");
    }
  }, []);
  if (!userInfo) {
    return <p>Loading user info...</p>;
  }

  return (
    <>
      <div>
        <h1>Info</h1>
        <p>hello {userInfo.username}</p>
        <p>name: {userInfo.name}</p>
        <p>username: {userInfo.username}</p>
        <p>email: {userInfo.email}</p>

        <p>address:</p>
        <p>street: {userInfo.address?.street}</p>
        <p>suite: {userInfo.address.suite}</p>
        <p>city: {userInfo.address.city}</p>
        <p>zipcode: {userInfo.address.zipcode}</p>
        <p>geo:</p>

        <p>lat: {userInfo.address.geo.lat}</p>
        <p>lng: {userInfo.address.geo.lng}</p>
        <p>phone: {userInfo.phone}</p>
        <p>website: {userInfo.website}</p>
        <p>company:</p>
        <p>website: {userInfo.company.name}</p>
        <p>website: {userInfo.company.catchPhrase}</p>
        <p>website: {userInfo.company.bs}</p>
      </div>
    </>
  );
}

export default Info;
