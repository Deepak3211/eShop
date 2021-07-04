import { Image, Icon} from 'semantic-ui-react'
import './createproduct.css'
const ImageUpload = ({handleUpload,images,inputRef,handleDelete}) => {
  return (
    <div className="upload">
      <input type="file" name="media" id="file" style={{ display: 'none' }}
        onChange={handleUpload}
        ref = {inputRef}
      />
          
            <div className="file_image" >
        {images === false ? (
        
        <div onClick={() => inputRef.current.click()}  style={{ cursor: 'pointer' }}>
            <Icon name='upload'
              style={{ cursor: 'pointer' }}
              
             size="huge"
            
            />
            <h2>Upload Image</h2>
          </div>
        ) : (
                <div className = 'file_imageResult' >
            <Image src={images ? images.url: ''} className = 'file__imageStyle' />
              <Icon name='remove circle' size='large' className = 'icon__delete' onClick={handleDelete} color='red'/>
              </div>
)}
            </div>
        
      </div>
  )
}

export default ImageUpload
