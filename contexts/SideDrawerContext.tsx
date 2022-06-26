import { createContext, useState } from 'react';

interface SideDrawerContextProps {
  open: boolean;

  toggleSideDrawer: () => void;
}

export const SideDrawerContext = createContext<SideDrawerContextProps>({
  open: false,
  toggleSideDrawer: () => {},
});

interface SideDrawerProviderProps {
  children: JSX.Element;
}
export const SideDrawerProvider: React.FC<SideDrawerProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleSideDrawer = () => {
    setOpen(!open);
    document.body.style.overflow = open ? '' : 'hidden';
  };

  return (
    <SideDrawerContext.Provider value={{ open, toggleSideDrawer }}>
      {children}
    </SideDrawerContext.Provider>
  );
};
