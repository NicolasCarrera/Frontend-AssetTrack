import { useRecoilState } from 'recoil';
import { isAuthenticatedState, userState } from '../state/userAtom';


export default function useAuth() {
  const [user, setUser] = useRecoilState(userState);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return { user, isAuthenticated, login, logout };
}