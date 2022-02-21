import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import PostScreen from './screens/PostScreen';

import CodeOfConduct from './screens/CodeOfConduct';
import PrivacyPolicy from './screens/PrivacyPolicy';
import TermsOfUse from './screens/TermsOfUse';
import SideBar from './components/SideBar';
import Dashboard from './screens/Dashboard';
import ManagePost from './screens/ManagePost';
import AdminAddPost from './screens/AdminAddPost';
import ManageUser from './screens/ManageUser';
import AdminUsersPosts from './screens/AdminUsersPosts';
import AdminProfile from './screens/AdminProfile';
import Reports from './screens/Reports';
import AdminList from './screens/AdminList';
import AddAdmin from './screens/AddAdmin';
import AdminEditPostScreen from './screens/AdminEditPostScreen';
import ReportScreen from './screens/ReportScreen';


function App() {
  return (
    <Router>

        <Routes>
          

          <Route  path='/admin/code-of-conduct' element={<><Header /> <SideBar /><CodeOfConduct /></>} />
          <Route  path='/admin/privacy-policy' element={<><Header /> <SideBar /><PrivacyPolicy /></>} />
          <Route  path='/admin/terms-of-use' element={<><Header /> <SideBar /><TermsOfUse /></>} />

          
          <Route  path='/admin/dashboard' element={<><Header /> <SideBar /><Dashboard /></>} />
          <Route  path='/admin/posts' element={<><Header /> <SideBar /><ManagePost /></>} />
          <Route  path='/admin/addpost' element={<><Header /> <SideBar /><AdminAddPost /></>} />
          <Route  path='/admin/users' element={<><Header /> <SideBar /><ManageUser /></>} />
          <Route  path='/admin/users/posts/:id' element={<><Header /> <SideBar /><AdminUsersPosts /></>} />
          <Route  path='/admin/profile' element={<><Header /> <SideBar /><AdminProfile /></>} />
          <Route  path='/admin/reports' element={<><Header /> <SideBar /><Reports /></>} />
          <Route  path='/admin/report/:id' element={<><Header /> <SideBar /><ReportScreen /></>} />
          <Route  path='/admin/manageadmins' element={<><Header /> <SideBar /><AdminList /></>} />
          <Route  path='/admin/addadmin' element={<><Header /> <SideBar /><AddAdmin /></>} />
          <Route  path='/admin/myposts/edit/:id' element={<><Header /> <SideBar /><AdminEditPostScreen /></>} />
          <Route  path='/admin/posts/:id' element={<><Header /> <SideBar /><PostScreen /></>} />




          <Route  path='/login' element={<LoginScreen />} />
        </Routes>

    </Router>
  );
}

export default App;
