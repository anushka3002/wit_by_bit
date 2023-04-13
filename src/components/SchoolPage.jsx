import React from 'react'
import { schoolRoute } from '../recoil/atoms/studentAtoms';
import { useRecoilValue } from 'recoil';

const SchoolPage = () => {
    const selectedRoute = useRecoilValue(schoolRoute);
  return (
    <div>{selectedRoute}</div>
  )
}

export default SchoolPage