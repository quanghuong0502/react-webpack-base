import { useState } from 'react';

interface IUseActiveParams {
  isActiveByDefault: boolean;
}
interface IUseActiveReturns {
  isActive: boolean;
  handleToggle: () => void;
}

const DEFAULT_PARAMS: IUseActiveParams = {
  isActiveByDefault: false
};

const useActive = ({ isActiveByDefault }: IUseActiveParams = DEFAULT_PARAMS): IUseActiveReturns => {
  const [isActive, setIsActive] = useState<boolean>(isActiveByDefault);

  const handleToggle = (): void => {
    setIsActive(prev => !prev);
  };

  return {
    isActive,
    handleToggle
  };
};

export default useActive;
