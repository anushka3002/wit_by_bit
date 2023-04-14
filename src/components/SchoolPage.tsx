import { schoolRoute } from '../recoil/atoms/studentAtoms.tsx';
import { useRecoilValue } from 'recoil';

const SchoolPage:React.FC = () => {
    const selectedRoute = useRecoilValue<string>(schoolRoute);
  return (
    <div className='w-full mr-6 pr-[24px] pt-4'>
      <p className='text-[35px] text-[#d4d4d4] text-center pt-40 font-bold'>{selectedRoute}</p>
      </div>
  )
}

export default SchoolPage