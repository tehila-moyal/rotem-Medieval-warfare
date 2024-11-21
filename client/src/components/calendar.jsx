import React, { useState, useEffect, useContext } from 'react';
import { format, startOfMonth, endOfMonth, addDays, startOfWeek, endOfWeek, isSameMonth, isSameDay, parse } from 'date-fns';
import Modal from 'react-modal';
// import { UserContext } from '../context/UserContext'; // Assuming the loggedUser is stored in UserContext

const getEvents = async (month) => {
  return [
    { time: '2024-11-18 08:12:00', eventTitle: 'Team Practice', eventContent: 'Karmiel practice session.', team: 'Karmiel' },
    { time: '2024-11-20 10:00:00', eventTitle: 'Tournament', eventContent: 'Regional Tournament.', team: 'All' },
  ];
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', content: '', team: '' });
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [hoveredDate, setHoveredDate] = useState(null);
  const start = startOfWeek(currentMonth);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

//   const { loggedUser } = useContext(UserContext); // Logged-in user context
    const loggedUser = {name:"gfdgfg" }

  useEffect(() => {
    fetchEvents();
  }, [currentMonth]);

  const fetchEvents = async () => {
    const month = format(currentMonth, 'yyyy-MM'); // Get month in 'YYYY-MM' format
    const response = await getEvents(month);
    setEvents(response); // Directly set the events from the response
  };


  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const dayEvents = events.filter((event) =>
          isSameDay(day, parse(event.time, 'yyyy-MM-dd HH:mm:ss', new Date()))
        );

        days.push(
          <div
            key={day}
            className={`relative p-4 border h-24 ${
              !isSameMonth(day, monthStart) ? 'bg-gray-100' : ''
            } ${isSameDay(day, new Date()) ? 'bg-blue-100' : ''}`}
            onMouseEnter={() => setHoveredDate({ date: day, events: dayEvents })}
            onMouseLeave={() => setHoveredDate(null)}
            onClick={() =>
              loggedUser && isSameMonth(day, monthStart) && openModal(day)
            }
          >
            <span className="font-bold">{format(day, 'd')}</span>
            {dayEvents.map((event, index) => (
              <div key={index} className="text-sm text-blue-500">
                {event.eventTitle}
              </div>
            ))}

            {/* Hover Popup for Events */}
            {hoveredDate?.date && isSameDay(hoveredDate.date, day) && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white border rounded shadow-lg p-2 z-10">
                {hoveredDate.events.map((event, index) => (
                  <div key={index} className="mb-2">
                    <div className="font-semibold">{event.eventTitle}</div>
                    <div className="text-xs text-gray-500">{event.eventContent}</div>
                    <div className="text-xs text-gray-400">{event.team}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  const openModal = (day) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewEvent({ title: '', content: '', team: '' });
  };

  const handleAddEvent = () => {
    console.log('Adding event:', newEvent, selectedDate);
    // Here, you'd add the new event to the database
    closeModal();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
      <button className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setCurrentMonth((prev) => addDays(prev, -30))} >
        Previous
      </button>
      <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
      <button className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setCurrentMonth((prev) => addDays(prev, 30))}>
        Next
      </button>
    </div>

    <div className="grid grid-cols-7 text-center font-semibold">
        {days.map((day) => (
          <div key={day} className="p-2">
            {format(day, 'EEE')}
          </div>
        ))}
      </div>
      {renderCells()}

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} ariaHideApp={false}>
        <div className="p-6 bg-white rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">
            Add Event for {format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          <input
            type="text"
            placeholder="Event Title"
            className="block w-full p-2 mb-2 border rounded"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <textarea
            placeholder="Event Content"
            className="block w-full p-2 mb-2 border rounded"
            value={newEvent.content}
            onChange={(e) =>
              setNewEvent({ ...newEvent, content: e.target.value })
            }
          ></textarea>
          <input type="text" placeholder="Team (Optional)" className="block w-full p-2 mb-4 border rounded"
            value={newEvent.team} onChange={(e) => setNewEvent({ ...newEvent, team: e.target.value })} />
          <button className="px-4 py-2 bg-blue-500 text-white rounded mr-2" onClick={handleAddEvent} >
            Add Event
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={closeModal} >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Calendar;
