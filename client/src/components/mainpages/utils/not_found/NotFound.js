import {  Image} from 'semantic-ui-react';
import img from './404-error-page.jpg';
import './notFound.css';
const NotFound = () => {
  return (
    <div className = "not__found">
      <Image src={img} alt="page not found"
        className = "not__foundImage"/>
    </div>
  )
}

export default NotFound
