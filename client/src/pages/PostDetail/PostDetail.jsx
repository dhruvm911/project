import React from 'react'
import PostAuthor from '../../components/PostAuthor'
import { Link } from 'react-router-dom'
import Thumbnail from '../../assets/blog22.jpg'
import styles from '../../components/styles.module.css'

const PostDetail = () => {
    return (
        <section className={styles.post_detail}>
            <div className={`${styles.container} ${styles.post_detail_container}`}>
                <div className={styles.post_detail_header}>
                    <PostAuthor/>
                    <div className={styles.post_detail_buttons}>
                        <Link to={'/posts/dhruv/edit'} className={`${styles.btn} ${styles.sm} ${styles.primary}`} >Edit</Link>
                        <Link to={'/posts/dhruv/delete' } className={`${styles.btn} ${styles.sm} ${styles.danger}`}>Delete</Link>
                    </div>
                </div>
                <h1>This is the post title!</h1>
                <div className={styles.post_detail_thumbnail}>
                    <img src={Thumbnail} alt="" />
                </div>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, 
                    magnam voluptate reprehenderit cumque exercitationem 
                    quos ipsum obcaecati veritatis nesciunt? Laboriosam saepe 
                    nulla maxime ducimus quas corrupti fuga velit aspernatur obcaecati.
                </p>I
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab quam ipsam sed nobis exercitationem aut nihil quas, 
                    reprehenderit molestiae numquam odio laudantium eveniet vitae iure ratione velit similique sequi harum minus? Modi, 
                    deserunt laboriosam? Doloribus ea distinctio excepturi 
                    incidunt hic illo quisquam debitis quae quasi sapiente! Expedita, numquam. Qui non quod dolor placeat dolorem. Nesciunt.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus esse, nobis, 
                    assumenda ab perspiciatis non odit deserunt id pariatur neque fuga quaerat recusandae 
                    reprehenderit voluptates possimus nulla hic delectus voluptatem, iste aspernatur. Cum 
                    hic aliquid dignissimos quos corrupti modi, atque esse magnam ducimus inventore beatae 
                    doloribus harum voluptatem dolore officiis optio vel rem tenetur. Dignissimos aspernatur 
                    alias odio? Quis voluptate illo reprehenderit minus error odit dolorum, fugit facilis fuga 
                    delectus modi corporis placeat sapiente autem dolores tempore vero officiis, magni consectetur 
                    quibusdam in, excepturi minima magnam voluptates! Fugiat, quae. Ad consequuntur eum suscipit 
                    dignissimos consequatur.Repellendus qui quasi deleniti labore illo quam earum accusantium eos 
                    quas asperiores, exercitationem cupiditate voluptates doloremque?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Animi a esse ad officia explicabo eaque impedit itaque nam labore est!
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius ad tenetur sint in veritatis eaque ullam atque 
                    laboriosam ratione quod. Consequuntur aliquam aut eius optio dolores similique suscipit nobis hic perspiciatis 
                    dicta velit id facilis quas iusto, totam doloribus neque explicabo eligendi qui quia deleniti delectus nostrum 
                    est possimus? Qui, velit maxime autem harum exercitationem tempore, sit accusantium vitae ducimus aliquid delectus? 
                    Asperiores aut sequi illum similique porro. Neque odit dolor labore perspiciatis tenetur quod libero ea, cum aspernatur 
                    minus iusto sint, quibusdam obcaecati perferendis mollitia ducimus, nisi quas. Et, praesentium nihil! Fuga velit nam est,
                    earum, libero fugit expedita quas aliquam harum esse sapiente asperiores et similique voluptates dicta optio. Quidem 
                    qui iste quisquam vero illum unde ipsam ad, ex enim dolorum, provident culpa iure dolore? Eius, fugiat eligendi vitae 
                    tempora velit exercitationem odit iusto distinctio animi voluptatibus aspernatur doloribus maxime dignissimos quis dolor? 
                    Totam velit reiciendis tempora ab obcaecati aliquid. Eveniet obcaecati labore aliquid dolorem incidunt a tempore, eaque 
                    ullam earum laboriosam ratione? Vel nihil fugiat assumenda voluptatibus non ipsa ratione, natus, error nulla maiores 
                    atque nostrum architecto asperiores consequuntur. Ex expedita possimus 
                    culpa est officiis aliquam ducimus iste animi nobis minima, incidunt necessitatibus natus eum, quis architecto?
                </p>
            </div>
            
        </section>
    )
}

export default PostDetail
