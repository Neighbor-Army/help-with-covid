import React from "react";
import Link from "next/link";
import "./Nav.scss";


const Nav = ({setAuthTab}) => {
  return (
    <div className="nav">
      <div className="left-nav">
        <Link href="/">
          <a>
            Neighbor Army
          </a>
        </Link>
      </div>
      {/* <div className="center-nav">
        <ul>
          {links.map(({ key, href, label }) => (
            <li key={key}>
              <Link href={href}>
                <a>{label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div> */}

      <div className="right-nav">
        <a href="/auth">
          <button onClick={()=> setAuthTab("login")}>Log In</button>
          </a>
          <button onClick={()=> setAuthTab("register")} className="signup">Sign Up</button>
      </div>
    </div>
  );
};
export default Nav;
