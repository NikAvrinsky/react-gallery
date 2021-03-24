import React, {Component} from 'react'


import './add-picture.scss'

export default class AddPicture extends Component {
    
    async handleSubmit(e) {
        e.preventDefault()
        let data = []
        let url = e.target.input.value
        const {onFormSubmit} = this.props
        
        if (url) {
            if (url.includes('galleryImages')) {
                data = JSON.parse(url).galleryImages
                let i = 0
                data.forEach(item=>{ 
                    
                    item.id = Date.now() + i
                    i++
                })
            } else if (url.includes('.json')) {
                await fetch(url)
                .then(res => res.json())
                .then((out) => {
                    let i =0
                    data = out.galleryImages
                    data.forEach(item=>{ 
                        item.id = Date.now() + i
                        i++
                    })
                console.log(data)
                })
                .catch(err => { throw err });
            } else {
                const preview = document.getElementById('preview')
                preview.src=url
                let obj = {
                    url: url,
                    width: preview.width,
                    height: preview.height,
                    id: Date.now()
                }
                console.log(obj)
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
            if(file.type === 'image/jpeg') {
            
                const reader = new FileReader()
                reader.onload = function (e) {
                    const image = document.getElementById('preview')
                    image.setAttribute('src',  e.target.result )
                    document.getElementById('input').value = e.target.result    
                }
                reader.readAsDataURL(file)
            } else if ( file.type === 'application/json') {
                const reader = new FileReader()
                reader.onload = function(e) {
                    document.getElementById('input').value = e.target.result
                }
                reader.readAsText(file)    
            } else {
                alert('формат файла не поддерживается')
            }
            
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
                    onSubmit={(e) => this.handleSubmit(e)}>
                    <div id="holder" 
                         className="holder_default">
                    <input
                        type='text'
                        placeholder='Введите ссылку на изображение, JSON файл или перетащите файл сюда'
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