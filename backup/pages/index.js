import Head from 'next/head';

import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { useEffect, useState } from 'react';

function HomePage(props) {

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events.events} />
    </div>
  );
}

export const getStaticProps = async () => {

  try{
    const request = await fetch('http://localhost:3000/api/eventData');
    
    if(!request.ok){
      throw new Error("Can not connect to datase")
    }

    const response = await request.json();

    return{
      props:{
        events:response,
      }
    }

  }catch(err){
    console.log(err.message);
  }
  
  
}
export default HomePage;
