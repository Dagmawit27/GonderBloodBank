import {Navigate, useLocation} from 'react-router-dom';

export default function ProtectRoute({children}){
  const isAuth = sessionStorage.getItem('username');
  const location = useLocation();

  if(!isAuth){
    return <Navigate to='/login' state={{from: location}} replace />
  }
  return children;
}