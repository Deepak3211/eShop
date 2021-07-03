import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Navbar from './components/navbar/Navbar';
import MainPages from './components/mainpages/Pages';
const App = () => {
  return (
    <DataProvider>
      <Router>


        <>
          <Navbar />
        <MainPages />
        </>
      </Router>
      
    
      
    </DataProvider>
  )
}

export default App
