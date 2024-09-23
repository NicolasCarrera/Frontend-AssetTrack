// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import AuthProvider from './components/authentication/AuthProvider'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
