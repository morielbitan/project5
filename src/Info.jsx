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
  }, [navigate]);

  if (!userInfo) {
    return <p>Loading user info...</p>;
  }

  const { name, username, email, address, phone, company } = userInfo;

  return (
    <div>
      <h1>Info</h1>

      {username && <p>hello {username}</p>}
      {name && <p>name: {name}</p>}
      {username && <p>username: {username}</p>}
      {email && <p>email: {email}</p>}

      {address && (
        <>
          <p>address:</p>
          {address.street && <p>street: {address.street}</p>}
          {address.suite && <p>suite: {address.suite}</p>}
          {address.city && <p>city: {address.city}</p>}
          {address.zipcode && <p>zipcode: {address.zipcode}</p>}

          {address.geo && (
            <>
              <p>geo:</p>
              {address.geo.lat && <p>lat: {address.geo.lat}</p>}
              {address.geo.lng && <p>lng: {address.geo.lng}</p>}
            </>
          )}
        </>
      )}

      {phone && <p>phone: {phone}</p>}
      {userInfo.website && <p>website: ******</p>}

      {company && (
        <>
          <p>company:</p>
          {company.name && <p>name: {company.name}</p>}
          {company.catchPhrase && <p>catchPhrase: {company.catchPhrase}</p>}
          {company.bs && <p>bs: {company.bs}</p>}
        </>
      )}
    </div>
  );
}

export default Info;
