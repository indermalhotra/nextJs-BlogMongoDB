import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  let filterData;
  let numMonth;
  let numYear;

  useEffect(()=>{
    if(!router.isReady) return;

    filterData = router.query.slug;

    const getData = async () => {
      const filteredYear = filterData[0];
      const filteredMonth = filterData[1];
    
      numYear = +filteredYear;
      numMonth = +filteredMonth;
  
      let events = await getFilteredEvents({year:numYear, month:numMonth});
      setLoadedEvents(events);
    }

    getData();
  },[router.isReady])


  console.log(filterData);
    

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
    </Head>
  );

  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Loading Data...</p>
        </ErrorAlert>
        
      </Fragment>
    );
  }
  

  if (loadedEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(loadedEvents[0].date);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={loadedEvents} />
    </Fragment>
  );

}


export default FilteredEventsPage;
