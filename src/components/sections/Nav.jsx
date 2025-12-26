import React from "react";
import "./Nav.css";
function Nav() {
  return (
    <div className="nav">
      <a href="https://www.youtube.com/" className="ahref">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052"
          alt=""
          className="image"
        />
      </a>
      <a
        href="https://www.symbolab.com/solver/calculus-calculator"
        className="ahref"
      >
        <img
          src="https://www.symbolab.com/public/favicon.png"
          alt=""
          className="image"
        />
      </a>
      <a href="https://www.x.com" className="ahref">
        <img
          src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
          alt=""
          className="image"
        />
      </a>
      <a href="https://www.desmos.com/calculator" className="ahref">
        <img
          src="https://help.desmos.com/hc/article_attachments/4413863846413/desmos_icon_square.png"
          alt=""
          className="image"
        />
      </a>
      <a href="https://catcourses.ucmerced.edu/courses/" className="ahref">
        <img
          src="https://www.wabash.edu/images2/technology/canvas.png"
          alt=""
          className="image"
        />
      </a>
      <a href="https://chat.openai.com/" className="ahref">
        <img
          src="https://static.vecteezy.com/system/resources/previews/021/059/825/original/chatgpt-logo-chat-gpt-icon-on-green-background-free-vector.jpg"
          alt=""
          className="image"
        />
      </a>
      <a href="https://github.com/" className="ahref">
        <img
          src="https://qph.cf2.quoracdn.net/main-qimg-729a22aba98d1235fdce4883accaf81e"
          alt=""
          className="image"
        />
      </a>
      <a href="https://outlook.office.com/mail/" className="ahref">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg/2203px-Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg.png"
          alt=""
          className="image"
        />
      </a>
      <a href="https://gmail.com/" className="ahref">
        <img
          src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png"
          alt=""
          className="image"
        />
      </a>
    </div>
  );
}

export default Nav;
