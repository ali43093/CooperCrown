import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import * as ReactDOM from 'react-dom';
import CalendarHeader from './CalendarHeader';
import clsx from 'clsx';
// import CustomWeek from './CustomWeek';
import EventDialog from './EventDialog';
import moment from 'moment';
import NewAppointmentDialog from './NewAppointmentDialog';
import React, { useEffect, useRef, useState } from 'react';
import reducer from './store/reducers';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import withReducer from 'app/store/withReducer';
import { toast, Zoom } from 'react-toastify';
import { firestore } from 'firebase';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';

moment.locale('ko', {
  week: {
    dow: 1,
    doy: 1
  }
});

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

// const allViews = Object.keys(Views).map((k) => Views[k]);

const useStyles = makeStyles((theme) => ({
  root: {
    '& .rbc-event-label': {
      display: 'none'
    },

    '& .rbc-header': {
      padding: '12px 6px',
      fontWeight: 600,
      fontSize: 14
    },
    '& .rbc-label': {
      padding: '8px 6px'
    },
    '& .rbc-today': {
      backgroundColor: 'transparent'
    },
    '& .rbc-header.rbc-today, & .rbc-month-view .rbc-day-bg.rbc-today': {
      borderBottom: `2px solid ${theme.palette.secondary.main}!important`
    },
    '& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view': {
      padding: 24,
      [theme.breakpoints.down('sm')]: {
        padding: 16
      },
      ...theme.mixins.border(0)
    },
    '& .rbc-agenda-view table': {
      ...theme.mixins.border(1),
      '& thead > tr > th': {
        ...theme.mixins.borderBottom(0)
      },
      '& tbody > tr > td': {
        padding: '12px 6px',
        '& + td': {
          ...theme.mixins.borderLeft(1)
        }
      }
    },
    '& .rbc-time-view': {
      '& .rbc-time-header': {
        ...theme.mixins.border(1)
      },
      '& .rbc-time-content': {
        flex: '0 1 auto',
        ...theme.mixins.border(1)
      }
    },
    '& .rbc-month-view': {
      '& > .rbc-row': {
        ...theme.mixins.border(1)
      },
      '& .rbc-month-row': {
        ...theme.mixins.border(1),
        borderWidth: '0 1px 1px 1px!important',
        minHeight: 128
      },
      '& .rbc-header + .rbc-header': {
        ...theme.mixins.borderLeft(1)
      },
      '& .rbc-header': {
        ...theme.mixins.borderBottom(0)
      },
      '& .rbc-day-bg + .rbc-day-bg': {
        ...theme.mixins.borderLeft(1)
      }
    },
    '& .rbc-day-slot .rbc-time-slot': {
      ...theme.mixins.borderTop(1),
      opacity: 0.5
    },
    '& .rbc-time-header > .rbc-row > * + *': {
      ...theme.mixins.borderLeft(1)
    },
    '& .rbc-time-content > * + * > *': {
      ...theme.mixins.borderLeft(1)
    },
    '& .rbc-day-bg + .rbc-day-bg': {
      ...theme.mixins.borderLeft(1)
    },
    '& .rbc-time-header > .rbc-row:first-child': {
      ...theme.mixins.borderBottom(1)
    },
    '& .rbc-timeslot-group': {
      minHeight: 64,
      ...theme.mixins.borderBottom(1)
    },
    '& .rbc-date-cell': {
      padding: 8,
      fontSize: 16,
      fontWeight: 400,
      opacity: 0.5,
      '& > a': {
        color: 'inherit'
      }
    },
    '& .rbc-event': {
      borderRadius: 4,
      padding: '4px 8px',
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      boxShadow: theme.shadows[0],
      transitionProperty: 'box-shadow',
      transitionDuration: theme.transitions.duration.short,
      transitionTimingFunction: theme.transitions.easing.easeInOut,
      position: 'relative',
      '&:hover': {
        boxShadow: theme.shadows[2]
      }
    },
    '& .rbc-row-segment': {
      padding: '0 4px 4px 4px'
    },
    '& .rbc-off-range-bg': {
      backgroundColor:
        theme.palette.type === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0.16)'
    },
    '& .rbc-show-more': {
      color: theme.palette.secondary.main,
      background: 'transparent'
    },
    '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event': {
      position: 'static'
    },
    '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:first-child':
    {
      left: 0,
      top: 0,
      bottom: 0,
      height: 'auto'
    },
    '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:last-child':
    {
      right: 0,
      top: 0,
      bottom: 0,
      height: 'auto'
    }
  },
  addButton: {
    position: 'absolute',
    right: 12,
    top: 172,
    zIndex: 99
  }
}));

function CalendarApp(props) {
  const dispatch = useDispatch();
  const appointments = useSelector(
    ({ calendarApp }) => calendarApp.events.entities
  );

  const [events, setEvents] = useState([]);
  const [currentShowroom, setCurrentShowroom] = useState(null);
  const classes = useStyles(props);
  const headerEl = useRef(null);
  const [isLoading, setisLoading] = useState(false)
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);

  useEffect(() => {
    dispatch(Actions.getEvents());
  }, [dispatch]);

  useEffect(() => {
    console.log(appointments)
  }, [appointments]);

  const moveEvent = async ({ event, start, end }) => {
    try {
      setisLoading(true)
      setEvents([])
      await firestore().collection('appointments').doc(event?.firebaseId).update({
        start: firestore.Timestamp.fromDate(start),
        end: firestore.Timestamp.fromDate(end)
      })
      dispatch(Actions.getEvents())
      setisLoading(false)
    } catch (error) {
      console.log('Error while moving event: ', error)
    }
  }

  const resizeEvent = async ({ event, start, end }) => {
    try {
      setisLoading(true)
      setEvents([])
      await firestore().collection('appointments').doc(event?.firebaseId).update({
        start: firestore.Timestamp.fromDate(start),
        end: firestore.Timestamp.fromDate(end)
      })
      dispatch(Actions.getEvents())
      setisLoading(false)
    } catch (error) {
      console.log('Error while resizing event: ', error)
    }
  }


if (isLoading) return <FuseLoading />

  return (
    <div className={clsx(classes.root, 'flex flex-col flex-auto relative')}>
      <div ref={headerEl} />
      <DragAndDropCalendar
        className="flex flex-1 container"
        selectable
        min={new Date(1950, 0, 0, 8, 0, 0, 0)}
        localizer={localizer}
        events={events?.length > 0 ? events : []}
        longPressThreshold={10}
        defaultView={Views.WEEK}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        defaultDate={new Date()}
        startAccessor="start"
        endAccessor="end"
        views={{ month: true, week: true }}
        step={15}
        timeslots={4}
        // showMultiDayTimes
        components={{
          toolbar: (_props) => {
            return headerEl.current
              ? ReactDOM.createPortal(
                <CalendarHeader {..._props} setEvents={setEvents} setCurrentShowroom={setCurrentShowroom} currentShowroom={currentShowroom} />,
                headerEl.current
              )
              : null;
          },
          event: Event
        }}
        // onNavigate={handleNavigate}
        onSelectEvent={(event) => {
          if (userData.userRole === 'admin' || userData?.appointmentsView) {
            dispatch(Actions.openEditEventDialog(event));
          } else {
            toast.error('You are not authorized', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Zoom
            });
          }
        }}
        onSelectSlot={(slotInfo) => {
          if (userData.userRole === 'admin' || userData?.appointmentsCreate) {
            if (!currentShowroom) {
              toast.error('Please select showroom first', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Zoom
              });
            } else {
              dispatch(
                Actions.openNewEventDialog({
                  start: slotInfo.start,
                  end: slotInfo.end,
                  showRoomId: currentShowroom
                })
              );
            }
          } else {
            toast.error('You are not authorized', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Zoom
            });
          }
        }}
      />

      <EventDialog />
      <NewAppointmentDialog />
    </div>
  );
}

function Event({ event }) {
  return (
    <div>
      <span className='text-10 lg:text-12 hidden lg:flex' >
        {`${event.start.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: false
        })} - ${event.end.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: false
        })} `}
        {event?.title && event.title}
      </span>
      <span className='text-10 lg:text-12 lg:hidden flex' >
        {event?.title && event.title}
      </span>
    </div>
  );
}

export default withReducer('calendarApp', reducer)(CalendarApp);

/*
IE 11 Fix
*/
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = (s) => {
    let el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}
