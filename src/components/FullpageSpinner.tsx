import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

export const FullpageSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader type="Grid" color="#00BFFF" />
  </div>
)
