const React = require('react');

const Events = ({ data }) => {
  return data.map(event => {
    return (
      <div className="event" key={event.description}>
        <div className="date">{event.date}</div>
        <div className="description">{event.description}</div>
      </div>
    )
  })
}

export default Events;