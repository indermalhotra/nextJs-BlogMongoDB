import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const router = useRouter();

  const eventID = router.query.eventId;
  const [showComments, setShowComments] = useState(false);
  const [allComments, setAllComments] = useState();

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

      console.log(resp);
    }
    postData();
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={allComments}/>}
    </section>
  );
}

export default Comments;
