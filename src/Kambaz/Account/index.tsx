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

      <h3>Team Info and Team Name:Group1-Quiz </h3>
      <div style={{ marginLeft: "1rem", lineHeight: "1.8" }}>

          <p><strong>CS5610 Group Project GitHub Links - Spring 2025</strong><br />
          React.js: <a href="https://github.com/sidrayu/cs5610Project2025SpringClient" target="_blank" rel="noreferrer">github.com/team/react-project</a><br />
          Node.js: <a href="https://github.com/sidrayu/cs5610Project2025SpringServer" target="_blank" rel="noreferrer">github.com/team/node-project</a></p>

          <p><strong>Chang Yu</strong><br />
              Email: yu.chang1@northeastern.edu<br />
              GitHub: <a href="https://github.com/sidrayu" target="_blank" rel="noreferrer">github.com/changyu</a></p>


          <p><strong>Katharine Huang</strong><br />
               Email: huang.kat@northeastern.edu<br />
               GitHub: <a href="https://github.com/KHuang00" target="_blank" rel="noreferrer">github.com/katharinehuang</a></p>


          <p><strong>Haoteng Yang</strong><br />
              Email: yang.haote@northeastern.edu<br />
              GitHub: <a href="https://github.com/HaotengYang" target="_blank" rel="noreferrer">github.com/haotengyang</a></p>

          <p><strong>Sichun Teng</strong><br />
              Email: teng.sic@northeastern.edu<br />
              GitHub: <a href="https://github.com/SICT-1281" target="_blank" rel="noreferrer">github.com/sichunteng</a></p>

          <p><strong>Xiaojun Yu </strong><br />
              Email: yu.xiaoj@northeastern.edu<br />
              GitHub: <a href="https://github.com/yogiyu1" target="_blank" rel="noreferrer">github.com/xiaojunyu</a></p>



      </div>

      </td>
        </tr>
      </table>
    </div>
);}
