import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Button, FormControl, Alert, FormLabel } from 'react-bootstrap';
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const updateProfile = async () => {
    try {
      console.log("Updating profile with role:", profile.role);
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error("Update profile failed:", error);
    }
  };
  
  const fetchProfile = () => {
    if (!currentUser) {
      navigate("/Kambaz/Account/Signin");
      return;
    }
    setProfile(currentUser);
  };
  
  const signout = async () => {
    try {
      await client.signout();
      dispatch(setCurrentUser(null));
      navigate("/Kambaz/Account/Signin");
    } catch (error) {
      console.error("Signout failed:", error);
    }
  };
  
  useEffect(() => { 
    fetchProfile(); 
  }, []);
  
  return (
    <div id="wd-signin-screen">
      <h1>Profile</h1>
      {showNotification && (
        <Alert variant="success" onClose={() => setShowNotification(false)} dismissible>
          Profile updated successfully!
        </Alert>
      )}
      {profile && (
        <div>
          <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
          <FormControl 
            defaultValue={profile.username} 
            id="wd-username" 
            className="mb-2"
            placeholder="Username"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
          <FormControl 
            defaultValue={profile.password} 
            id="wd-password" 
            className="mb-2"
            placeholder="Password"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <FormControl 
            defaultValue={profile.firstName} 
            id="wd-firstname" 
            className="mb-2"
            placeholder="First Name"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <FormControl 
            defaultValue={profile.lastName} 
            id="wd-lastname" 
            className="mb-2"
            placeholder="Last Name"
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
          <FormLabel>Date of Birth</FormLabel>
          <FormControl 
            defaultValue={profile.dob} 
            id="wd-dob" 
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })} 
            type="date"
          />
          <FormControl 
            defaultValue={profile.email} 
            id="wd-email" 
            className="mb-2"
            placeholder="Email"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select 
            value={profile.role || ""}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            className="form-control mb-2" 
            id="wd-role"
          >
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}