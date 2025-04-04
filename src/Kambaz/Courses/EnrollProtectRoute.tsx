import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function EnrolledRoute({ children }: { children: any }) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);

  
  const isEnrolled = enrollments.some(
    (e: { user: string; course: string }) =>
      e.user === currentUser?._id && e.course === cid
  );

  if (!isEnrolled) {
    return <Navigate to="/Kambaz/Dashboard" />;
  }

  return children;
}