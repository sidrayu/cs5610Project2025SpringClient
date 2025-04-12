import { Routes, Route, Navigate } from "react-router";
import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import { useSelector } from "react-redux";
export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div id="wd-account-screen">
      <table>
        <tr>
          <td valign="top">
            <AccountNavigation />
          </td>
          <td valign="top">

      <Routes>
      <Route path="/" element={<Navigate to={ currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin" }/>}/>
      
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>

              <br/><br/><br/>

      <h3>Team Info</h3>
      <div style={{ marginLeft: "1rem", lineHeight: "1.8" }}>

          <p><strong>CS5610 Group Project GitHub Links</strong><br />
          React.js: <a href="https://github.com/sidrayu/cs5610Project2025SpringClient" target="_blank" rel="noreferrer">github.com/team/react-project</a><br />
          Node.js: <a href="https://github.com/sidrayu/cs5610Project2025SpringServer" target="_blank" rel="noreferrer">github.com/team/node-project</a></p>

          <p><strong>Chang Yu</strong><br />
              Email: email<br />
              GitHub: <a href="https://github.com/sidrayu" target="_blank" rel="noreferrer">github.com/Chang Yu</a></p>


          <p><strong>Katharine Huang</strong><br />
               Email: huang.kat@northeastern.edu<br />
               GitHub: <a href="https://github.com/KHuang00" target="_blank" rel="noreferrer">github.com/katharinehuang</a></p>


          <p><strong>NAME</strong><br />
              Email: email<br />
              GitHub: <a href="https://XX" target="_blank" rel="noreferrer">github.com/NAME</a></p>

          <p><strong>NAME</strong><br />
              Email: email<br />
              GitHub: <a href="https://XX" target="_blank" rel="noreferrer">github.com/NAME</a></p>

          <p><strong>NAME </strong><br />
              Email: email<br />
              GitHub: <a href="https://XXX" target="_blank" rel="noreferrer">github.com/NAME</a></p>



      </div>

      </td>
        </tr>
      </table>
    </div>
);}
