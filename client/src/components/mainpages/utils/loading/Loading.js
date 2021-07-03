import { Loader} from 'semantic-ui-react';
import './loading.css';
const Loading = () => {
  return (
    <div className = 'loading'>
        <Loader size = 'medium' active inline='centered' />


      
    </div>
  )
}

export default Loading
