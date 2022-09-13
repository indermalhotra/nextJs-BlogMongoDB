import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import Comments from '../../components/input/comments';

function EventDetailPage(props) {
 
  console.log(props);
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta
          name='description'
          content={event.description}
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const connectDatabase = async () => {
    // CONNECTED TO DATABASE newsletter1
    const client = await MongoClient.connect('mongodb+srv://ekum:xOVeZSngVLNm7WSH@cluster0.kv1cwcj.mongodb.net/newsletter1?retryWrites=true&w=majority');
    return client;
  }

  const getData = async (client) => {
    const db = client.db();

    // CREATEING COLLECTION IN newsletter1 i.e emails
    const comments = db.collection('events');

    let result = await comments.find({ id: eventId }).toArray();
    console.log(result)
    return await result;
  }


  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    
  }

  try {
    const data = await getData(client);
    const jData = await data.json();

    return{
      props:{
        event:jData,
      }
    }
  } catch (err) {
    
  }
}

export async function getStaticPaths() {
  return {
    paths:[
      {params:{eventId:'e1'}},
      {params:{eventId:'e2'}}
  ],

    fallback: 'blocking'
  };
}

export default EventDetailPage;
