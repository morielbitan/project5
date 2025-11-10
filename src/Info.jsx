import { useEffect, useState } from "react";
import "./App.css";

function Info() {
  const [userInfo, setUserInfo] = useState({
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  });
  return (
    <>
      <div>
        <h1>Info</h1>
        <p>hello {userInfo.username}</p>
        <p>name: {userInfo.name}</p>
        <p>username: {userInfo.username}</p>
        <p>email: {userInfo.email}</p>

        <p>address:</p>
        <p>street: {userInfo.address.street}</p>
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
