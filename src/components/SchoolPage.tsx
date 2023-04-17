import School from '../images/school.tsx';
import { schoolRoute, showSidebarFlag } from '../recoil/atoms/studentAtoms.tsx';
import { useRecoilState, useRecoilValue } from 'recoil';

const SchoolPage:React.FC = () => {
  const [showSidebarFlagVal, setShowSidebarFlag] = useRecoilState<boolean>(showSidebarFlag);
    const selectedRoute = useRecoilValue<string>(schoolRoute);
  return (
    <div className='w-full sm:mr-6 mr-0 sm:pr-[24px] pr-0 pt-4'>
       <div className="flex sm:hidden block my-auto pl-[9px]">
          <img onClick={()=>setShowSidebarFlag(true)} className="w-[20px] h-[20px] mt-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"></img>
        <div className="mt-1 ml-2 bg-[#FFBF3F] sm:p-4 p-2 rounded-[8px] sm:w-[60px] w-[30px] sm:h-[48px] h-[28px]">
          <div className=" mx-auto mt-[-10px] flex flex-cols justify-center">
            <School />
          </div>
          </div>
          </div>
          <hr className='mt-2 sm:hidden block'></hr>
      <p className='text-[35px] text-[#d4d4d4] text-center pt-40 font-bold'>{selectedRoute}</p>
      </div>
  )
}

export default SchoolPage