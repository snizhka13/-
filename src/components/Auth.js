import { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import logout from "../images/logout.svg"


const clientId = "331907712233-pnfovddpqhes5clcee1mnt4al8u27fdl.apps.googleusercontent.com";

export default function Auth({ setUserData }) { 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded); 
    const userData = {
      token: credentialResponse.credential,
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture, 
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setUserData(userData); 
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUserData(null);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="auth-container">
        {user ? (
          <div className="profile">
            <button onClick={handleLogout} className="logout">
              <img src={user.picture? user.picture : "https://surl.lu/wpbweu"} className="profile-avatar" />
              <img src={logout}  width="24" height="24" />
            </button>
          </div>
        ) : (
          <div className="custom-google-wrapper">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => console.log("Помилка авторизації")}
              text="sign in"
              shape="pill"
              theme="dark"
            />
          </div>

        )}
      </div>
    </GoogleOAuthProvider>
  );
}
