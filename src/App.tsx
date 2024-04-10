import { Route, Routes } from "react-router-dom";
import Login from "@/pages/auth/Login";
import NotFound from "@/components/NotFound";
import DashboardLayout from "@/layouts/DashboardLayout";
import { RequireAuth } from "./components/auth/RequireAuth";
import { Users } from "./pages/users/Users";
import { UserInfo } from "./pages/users/UserInfo";
import { CreateUser } from "./pages/users/CreateUser";
import Units from "./pages/units/Units";
import { CreateUnit } from "./pages/units/CreateUnit";
import { EditUser } from "./pages/users/EditUser";
import { Roles } from "./pages/role/Roles";
import Dashboard from "./pages/dashboard/Dashboard";
import { EditUnit } from "./pages/units/EditUnit";
import SelfRegisteredRecord from "./pages/document/dispatch/self-registered-record/SelfRegisteredRecord";
import { DocumentTypePage } from "./pages/document/document-type/DocumentType";
import { EditSelfRegisteredRecord } from "./pages/document/dispatch/self-registered-record/EditSelfRegisteredRecord";
import { SelfRegisteredInfo } from "./pages/document/dispatch/self-registered-record/SelfRegisteredInfo";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword";
import DraftSelfRegisteredRecordInfo from "./pages/document/dispatch/self-registered-record/draft/DraftSelfRegisteredRecordInfo";
import { EditDraftSelfRegisteredRecord } from "./pages/document/dispatch/self-registered-record/draft/EditDraftSelfRegisteredRecord";
import { AccpetingRecord } from "./pages/document/accepting/AccpetingRecord";
import { ReceivedRecord } from "./pages/document/received-record/ReceivedRecord";
import { CreateReceivedRecord } from "./pages/document/received-record/CreateReceivedRecord";
import { DropOff } from "./pages/document/drop-off/DropOff";
import OtherRegisteredRecord from "./pages/document/dispatch/other-registered-record/OtherRegisteredRecord";
import { CreateSelfRegisteredRecord } from "./pages/document/dispatch/self-registered-record/CreateSelfRegisteredRecord";
import { DraftSelfRegisteredRecord } from "./pages/document/dispatch/self-registered-record/draft/DraftSelfRegisteredRecord";
import { CreateOtherRegisteredRecord } from "./pages/document/dispatch/other-registered-record/CreateOtherRegisteredRecord";
import { DraftOtherRegisteredRecord } from "./pages/document/dispatch/other-registered-record/draft/DraftOtherRegisteredRecord";
import { DispatchedOtherRecord } from "./pages/document/dispatch/other-registered-record/DispatchedOtherRecord";
import { DispatchedSelfRecord } from "./pages/document/dispatch/DispatchedSelfRecord";
import { OtherRegisteredInfo } from "./pages/document/dispatch/other-registered-record/OtherRegisteredInfo";
import { Profile } from "./pages/users/Profile";

function App() {
  document.title = "DTR";

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/:token/forgot-password" element={<ResetPassword />} />

      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />

          {/* User */}
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserInfo />} />
          <Route path="/users/:id/edit" element={<EditUser />} />
          <Route path="/users/create" element={<CreateUser />} />

          {/* Unit */}
          <Route path="/units" element={<Units />} />
          <Route path="/units/:id/edit" element={<EditUnit />} />
          <Route path="/units/create" element={<CreateUnit />} />

          {/* DocumentDispatch */}
          <Route path="/self-registered/dispatched" element={<DispatchedSelfRecord />} />
          <Route path="/other-registered/dispatched" element={<DispatchedOtherRecord />} />

          <Route path="/document-type" element={<DocumentTypePage />} />

          {/* Role */}
          <Route path="/roles" element={<Roles />} />

          {/* Out Record */}

          <Route
            path="/self-registered"
            element={<SelfRegisteredRecord />}
          />
          <Route
            path="/self-registered/create"
            element={<CreateSelfRegisteredRecord />}
          />
          <Route
            path="/self-registered/:id"
            element={<SelfRegisteredInfo />}
          />
          <Route
            path="/self-registered/:id/edit"
            element={<EditSelfRegisteredRecord />}
          />
          <Route
            path="/other-registered"
            element={<OtherRegisteredRecord />}
          />
          <Route
            path="/other-registered/:id"
            element={<OtherRegisteredInfo />}
          />
          <Route
            path="/other-registered/create"
            element={<CreateOtherRegisteredRecord />}
          />

          {/* Received Record */}
          <Route
            path="/received-record/accepted"
            element={<AccpetingRecord />}
          />
          <Route path="/received-record/dropped-off" element={<DropOff />} />
          <Route
            path="/received-record/create"
            element={<CreateReceivedRecord />}
          />
          <Route path="/received-record/dropped-off" element={<ReceivedRecord />} />
          <Route path="/received-record" element={<ReceivedRecord />} />

          {/* Draft */}
          <Route
            path="/draft/self-registered/:id"
            element={<DraftSelfRegisteredRecordInfo />}
          />
          <Route
            path="/draft/self-registered"
            element={<DraftSelfRegisteredRecord />}
          />
          <Route
            path="/draft/self-registered/:id/edit"
            element={<EditDraftSelfRegisteredRecord />}
          />
          <Route
            path="/draft/other-registered"
            element={<DraftOtherRegisteredRecord />}
          />
          <Route
            path="/draft/other-registered/:id"
            element={<DraftSelfRegisteredRecordInfo />}
          />
          {/* <Route
            path="/other-registered/draft/:id/edit"
            element={<EditDraftOther />}
          /> */}

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
