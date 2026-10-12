import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Repositories from "./Pages/Repositories";
import ProjectDetails from "./Pages/ProjectDetails";
import SubmissionDetailsPage from "./Pages/SubmissionDetailsPage";
import Layout from "./Components/Layout/Layout";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./Components/Global/ProtectedRoute";
import InvitationAccepting from "./Components/Invitation/AcceptInvitationPage";

function App() {


  return (
    <>
    <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>
    <Routes>

      {/* Auth pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Application pages */}
      <Route
        path="/repositories"
        element={
          <Protected>
          <Layout>
            <Repositories />
          </Layout>
          </Protected>
        }
      />

      <Route
        path="/repositories/:id"
        element={
          <Protected>
            <Layout>
              <ProjectDetails />
            </Layout>
          </Protected>
        }
      />

      <Route
        path="/submission/:id"
        element={
          <Layout>
            <SubmissionDetailsPage />
          </Layout>
        }
      />

      <Route
        path="/invitation"
        element={
          <InvitationAccepting />
        }
        />
    </Routes>
    </>

  );
}

export default App;