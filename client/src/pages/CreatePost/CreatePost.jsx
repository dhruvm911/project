import React, {useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styles from '../../components/styles.module.css'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('Uncategorized')
    const [description, setDescription] = useState('')
    const [thumbnail, setThumbnail] = useState('') 

    const modules = {
        toolbar: [
            [{ 'header': [1, 2,3, 4,5,6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean'] 
        ],
    }
    const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
    ]

    const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment",
    "Uncategorized", "Weather"]

    return (
        <section className={styles.create_post}>
            <div className={styles.container}>
                <h2>Create Post</h2>
                <p className={styles.form_error_message}>
                    This is an error message
                </p>
                <form className={`${styles.form} ${styles.create_post_form}`}>
                    <input type='text' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
                    <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
                        {
                            POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
                        }
                    </select>
                    <ReactQuill className={styles.q1_editor} modules = {modules} formats={formats} value={description} onChange={setDescription} />
                    <input type="file" onChange={e => setThumbnail (e.target.files[0])} accept='png, jpg, jpeg' />
                    <button type="submit" className={`${styles.btn} ${styles.primary}`} >Create</button>

                </form>
            </div>
        </section>
    )
}

export default CreatePost
