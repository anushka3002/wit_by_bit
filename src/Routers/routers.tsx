import { Route, Routes } from "react-router"
import Dashboard from "../components/dashboard.tsx"
import { schoolRoute } from "../recoil/atoms/studentAtoms.tsx";
import { useRecoilValue } from "recoil";
import SchoolPage from "../components/SchoolPage.tsx";

const Routers:React.FC = () =>{

    const selectedRoute = useRecoilValue(schoolRoute);

    return(
        <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path={`/${selectedRoute}`} element={selectedRoute=="Students" ? <Dashboard/>: <SchoolPage/>}/>
        </Routes>
    )
}

export default Routers