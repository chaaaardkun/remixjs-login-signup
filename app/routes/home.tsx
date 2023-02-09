import { redirect } from "@remix-run/node";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Home() {
  const [tokenState, setTokenState] = useState("");
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      console.log(token);
      window.location.href = "/";
    } else {
      setTokenState(token);
    }
  }, []);

  const onLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <div>
      <img
        src="https://doconchain.com/static/media/DoconchainlogoV2.49aead5be0245e0467c1.png"
        alt="logo"
        className="m-auto h-12 mt-10"
      />
      <h3>Welcome! Token: {tokenState}</h3>
      <button onClick={() => onLogout()}>Logout</button>
    </div>
  );
}
