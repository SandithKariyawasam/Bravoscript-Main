import { Routes, Route, useLocation } from "react-router-dom";
import './index.css'
import Dashboard from './dashboard/dashboard'
import Upload from './upload/upload'
import Update from './update/update'
import Sidenav from './components/sidenav'
import User from './user/user'

const Index = () => {
  return (
    <>

      <div className="index">
        <div className="side">
          <Sidenav />
        </div>
        <div className="index-content">



          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="create" element={<Upload />} />
            <Route path="update" element={<Update />} />
            <Route path="users" element={<User />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default Index
