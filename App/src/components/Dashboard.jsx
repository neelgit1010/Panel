import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

const Dashboard = () => {
  const location = useLocation();
  const {userData} = location.state || {};
  
  if (userData === undefined) {
    return <h1>No User Data</h1>
  }
  return (
    <div>
        <div className='header'>
          <h1>Header</h1>
        </div>
        <Sidebar />
        <div className='content'>
          <h1>Content</h1>
          <h2>{userData.first_name ?? 'No Name'}</h2>
          <h2>{userData.email ?? 'No Email'}</h2>
        </div>
        
    </div>
  )
}

export default Dashboard