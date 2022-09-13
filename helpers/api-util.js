export const getAllEvents = async () => {
  const request = await fetch('http://localhost:3000/api/eventData');
  const response = await request.json();
  return await response;
}

export async function getFeaturedEvents() {
  const request = await fetch('http://localhost:3000/api/eventFeature');
  const response = await request.json();
  return await response;
}

export async function getEventById(id) {
  const request = await fetch(`http://localhost:3000/api/${id}`);
  const response = await request.json();
  return await response;
  
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  

  let filteredEvents = await allEvents.events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  console.log(filteredEvents)

  return filteredEvents;
}