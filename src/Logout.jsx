// import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate("/");
  }, [navigate]);
  return (
    <>
      <div></div>
    </>
  );
}

export default Logout;
