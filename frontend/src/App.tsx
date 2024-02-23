import { HashRouter } from "react-router-dom";
import { MainProvider } from './contexts/mainProvider'
import { Navigation } from './Navigation/Routes'
import { Flip, ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import "../src/styles/css/style.css";
import "react-toastify/dist/ReactToastify.css";
import '../src/styles/globals.css'

function App() {

  return (
    <HashRouter basename={process.env.REACT_APP_BASE_PATH}>
      <MainProvider>
        <Navigation />
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          draggable
          pauseOnHover
          theme="colored"
          transition={Flip}
        />
      </MainProvider>
    </HashRouter>
  )
}

export default App