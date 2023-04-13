import { Route, Routes } from "react-router"
import Dashboard from "../components/dashboard"
import { schoolRoute } from "../recoil/atoms/studentAtoms";
import { useRecoilValue } from "recoil";
import SchoolPage from "../components/SchoolPage";

const Routers = () =>{

    const selectedRoute = useRecoilValue(schoolRoute);

    return(
        <Routes>
            <Route exact path="/" element={<Dashboard/>}></Route>
            <Route path={`/${selectedRoute}`} element={selectedRoute=="Students" ? <Dashboard/>: <SchoolPage/>}/>
        </Routes>
    )
}

export default Routers