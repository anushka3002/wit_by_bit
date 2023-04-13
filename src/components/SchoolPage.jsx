import React from 'react'
import { schoolRoute } from '../recoil/atoms/studentAtoms';
import { useRecoilValue } from 'recoil';

const SchoolPage = () => {
    const selectedRoute = useRecoilValue(schoolRoute);
  return (
    <div className='w-full mr-6 pr-[24px] pt-4'>
      <p className='text-[35px] text-[#d4d4d4] text-center pt-40 font-bold'>{selectedRoute}</p>
      </div>
  )
}

export default SchoolPage