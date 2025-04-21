import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as coursesClient from "../client";
import { useSelector } from "react-redux";

export default function PeopleTable({ users: propUsers = [] }: { users?: any[] }) {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>(propUsers);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const fetchUsersForCourse = async () => {
    if (cid && propUsers.length === 0) {
      const enrolledUsers = await coursesClient.findUsersForCourse(cid);
      setUsers(enrolledUsers);
    }
  };
  
  useEffect(() => {
    // If users are passed as props, use those
    if (propUsers.length > 0) {
      setUsers(propUsers);
    } else {
      // Otherwise fetch users for the current course
      fetchUsersForCourse();
    }
  }, [cid, propUsers]);
  
  // Determine if we're in the Account/Users route (no cid) or Courses/People route (has cid)
  const isAccountUsersRoute = !cid;
  const isAdmin = currentUser?.role === "ADMIN";
  
  return (
    <div id="wd-people-table">
      <PeopleDetails />
      <Table striped>
        <thead>
          <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
        </thead>
        <tbody>
        {users.filter(user => user !== null && user !== undefined).map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                {isAccountUsersRoute || isAdmin ? (
                  <Link to={`/Kambaz/Account/Users/${user._id}`} className="text-decoration-none">
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName}</span>&nbsp;
                    <span className="wd-last-name">{user.lastName}</span>
                  </Link>
                ) : (
                  <>
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName}</span>&nbsp;
                    <span className="wd-last-name">{user.lastName}</span>
                  </>
                )}
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}