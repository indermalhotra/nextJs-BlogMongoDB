import { useEffect, useState, useContext } from 'react';
import {useRouter} from 'next/router';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificaionCtx from '../../store/notifincation-context';

function Comments(props) {

  const notification = useContext(NotificaionCtx);

  const { eventId } = props;
  const router = useRouter();

  const eventID = router.query.eventId;
  const [showComments, setShowComments] = useState(false);
  const [allComments, setAllComments] = useState();
  const [response, setResponse] = useState('');

  const getData = async () => {
    const request = await fetch(`/api/events/${eventID}`);
    const resp = await request.json();
    setAllComments(resp.comments);
  }

  useEffect(()=>{
    getData();
  },[showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notification.showNotification({
      title:"Posting...",
      message:"posting in progress",
      status:"pending"
    })
    getData();

    // send data to API
    const postData = async () => {
      const request = await fetch(`/api/events/${eventID}`, {
        method:"POST",
        body:JSON.stringify(commentData),
        header:{
          'Content-Type': 'application/json'
        }
      });

      const resp = await request.json();

      setResponse(resp.message);
    }

    postData();

    notification.showNotification({
      title:"Success",
      message:"Comment posted successfully",
      status:"success"
    })
  }

  return (
    <section className={classes.comments}>
      {console.log(allComments)}
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {response && <p>{response}</p>}
      {showComments && <CommentList comments={allComments}/>}
    </section>
  );
}

export default Comments;
