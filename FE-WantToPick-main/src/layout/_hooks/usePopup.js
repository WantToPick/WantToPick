import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function usePopup(initialState = false) {
  const [isPopupOpen, setIsPopupOpen] = useState(initialState);
  const navigate = useNavigate();
  const location = useLocation();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    if (!isPopupOpen) {
      navigate('/login');
    } else {
      navigate(location.pathname.split('/login')[0]);
    }
  };

  useEffect(() => {
    if (location.pathname.includes('/login')) {
      setIsPopupOpen(true);
    } else {
      setIsPopupOpen(false);
    }
  }, [location]);

  return {
    isPopupOpen,
    togglePopup,
  };
}
