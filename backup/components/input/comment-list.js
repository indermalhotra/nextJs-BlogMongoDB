import classes from './comment-list.module.css';

function CommentList(props) {
  
  if(!props){
    return<p>Data Loading...</p>
  }
  
  console.log(props);
  const commentList = props.comments.map((data, indx)=> {
    return (
      <li key={indx}>
        <p>{data.comment}</p>
        <div>
          By <address>{data.name}</address>
        </div>
      </li>
    )
  })
  return (
    <ul className={classes.comments}>
      {commentList}
    </ul>
  );
}

export default CommentList;
