import type { RootState } from '../redux/store.ts';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router'

export default function ProtectedRoute() {
    const reduxUser = useSelector(
    (globalstore: RootState) => globalstore.user.value,
  );
   if(reduxUser){
 return <Outlet/> ;
   }
  return <Navigate to ="/Login"/>
}
