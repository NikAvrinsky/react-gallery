import React, {Component} from 'react'


import './add-picture.css'

export default class AddPicture extends Component {
    
    async _handleSubmit(e) {
        e.preventDefault()
        let data = []
        let url = e.target.input.value
        const {onFormSubmit} = this.props
        if (url) {
            if (url.includes('.json')) {
                await fetch(url)
                .then(res => res.json())
                .then((out) => {
                data = out.galleryImages
                })
                .catch(err => { throw err });
            } else {
                const preview = document.getElementById('preview')
                preview.src=url
                let obj = {
                    url: url,
                    width: preview.width,
                    height: preview.height
                }
                data.push(obj)
                obj = []
            }
            onFormSubmit(data)
        } 
        e.target.input.value = ''
    }
    

    dragFileUpload() {
        const holder = document.getElementById('holder')
        holder.ondragover = function() {
            this.className = 'hover'
            return false
        }
        holder.ondrop = function (e) {
            
            e.preventDefault()
            const file = e.dataTransfer.files[0]
            const reader = new FileReader()
            reader.onload = function (e) {
                const image = document.getElementById('preview')
                image.setAttribute('src',  e.target.result )
                document.getElementById('input').value = e.target.result
                
                
            }
            reader.readAsDataURL(file)
        
        }
    }
    componentDidMount() {
        this.dragFileUpload() 
    }
    render() {
        
        return (
            <div className="d-flex">
                <form 
                    className='d-flex justify-sb'
                    onSubmit={(e) => this._handleSubmit(e)}>
                    <div id="holder" 
                         className="holder_default">
                    <input
                        type='text'
                        placeholder='Введите ссылку на изображение или файл JSON'
                        className='form-control mr10'
                        id='input'  
                    />
                    </div>
                    
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