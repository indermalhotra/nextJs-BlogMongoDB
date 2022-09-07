import classes from './comment-list.module.css';

function CommentList(props) {
  console.log(props);
  if(!props){
    return<p>Data Loading...</p>
  }

  const commentList = props.comments.map(data=> {
    return (
      <li key={data.id}>
        <p>{data.text}</p>
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
