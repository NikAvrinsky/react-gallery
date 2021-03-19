import React, {Component} from 'react'


import './app-picture.css'

export default class AddPicture extends Component {
    constructor(props) {
        super(props)
        this.url=''
        this.data = []
        
    }

    
    async _handleSubmit(e) {
        e.preventDefault()
        if (e.target.input.value) {
            this.data = []
        const {onFormSubmit} = this.props
        
        if (this.url.includes('.json')) {
            await fetch(this.url)
            .then(res => res.json())
            .then((out) => {
              this.data = out.galleryImages
            })
            .catch(err => { throw err });
        } else {
            const preview = document.getElementById('preview')
            
            preview.src=this.url
            let obj = {
                url:this.url,
                width: preview.width,
                height: preview.height
            }
            this.data.push(obj)
            obj = []
        }
        onFormSubmit(this.data)
        }
        
        e.target.input.value = ''
    }
    _handleInputChange(e) {
        e.preventDefault()
        this.url = e.target.value
      }
    
    render() {
        return (
            <div className="d-flex">
                <form 
                    className='d-flex justify-sb'
                    onSubmit={(e) => this._handleSubmit(e)}>
                    <input
                        type='text'
                        placeholder='Введите ссылку на картинку или файл JSON'
                        className='form-control mr10'
                        id='input'
                        onChange={(e) => this._handleInputChange(e)}
                    />
                    <button
                        type='submit'
                        className='btn btn-outline-secondary'
                    >Загрузить</button>
                </form>
                <img id='preview' src='' alt='img'></img>
            </div>
        )
    }
}