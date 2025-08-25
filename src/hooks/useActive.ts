import { useState } from 'react';

interface IUseActiveParams {
  isActiveByDefault?: boolean;
}
interface IUseActiveReturns {
  isActive: boolean;
  handleToggle: () => void;
}
const useActive = ({ isActiveByDefault }: IUseActiveParams): IUseActiveReturns => {
  const [isActive, setIsActive] = useState<boolean>(!!isActiveByDefault);

  const handleToggle = (): void => {
    setIsActive(prev => !prev);
  };

  return {
    isActive,
    handleToggle
  };
};

export default useActive;
