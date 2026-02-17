import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileForm } from "./views/profile/ProfileForm";
import SingUpForm from "./views/profile/SingUpForm";
import { AppLayout } from "./layout/AppLayout";
import { AuthLayout } from "./layout/AuthLayout";

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH (públicas) */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index path="login" element={<ProfileForm />} />
          <Route path="signup" element={<SingUpForm />} />
          <Route path="forgot-password" element={<div>Forgot</div>} />
          <Route path="verify" element={<div>Verify</div>} />
        </Route>

        {/* APP (protegidas) */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<div>Dashboard</div>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
