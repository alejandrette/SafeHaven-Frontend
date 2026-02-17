import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";

export function AppLayout() {
  const { data, isError, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <ClipLoader color="#6b21a8" size={40} />
      </div>
    );
  }

  if (!data || isError) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <>
      <Header name={data.name} />
      <ToastContainer position="top-right" autoClose={5000} />
      <Outlet />
    </>
  );
}
