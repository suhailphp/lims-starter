import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef, useEffect, useMemo, useState } from "react";
import CalendarModal from "./calendarModal";
import { Path } from "../../../routes/path";
import type {
  EventContentArg,
  EventClickArg,
  EventDropArg,
} from "@fullcalendar/core";
import {
  Draggable,
  type DateClickArg,
  type DropArg,
} from "@fullcalendar/interaction";
import { Link } from "react-router-dom";
import { useDropdown } from "../../../hooks/useDropdown";



// Map event title keywords to Tabler dot text color classes
const getDotTextClass = (title: string): string => {
  const lower = (title || "").toLowerCase();
  if (lower.includes("meeting")) return "text-info";
  if (lower.includes("office")) return "text-secondary";
  if (lower.includes("hiring")) return "text-success";
  if (lower.includes("holiday")) return "text-pink";
  if (lower.includes("employee")) return "text-warning";
  return "text-info";
};

// Custom renderer for FullCalendar events to show a colored Tabler dot
const renderEventContent = (arg: EventContentArg) => {
  const title: string = arg?.event?.title || "";
  const dotClass = getDotTextClass(title);
  return (
    <div className="d-flex align-items-center">
      <i className={`ti ti-point-filled ${dotClass} me-1 fs-16`} />
      <span>{title}</span>
    </div>
  );
};

// Event data interface
interface EventData {
  id?: string;
  title?: string;
  start?: string;
  className?: string;
  description?: string;
}

// Custom hook for calendar functionality
const useCalendar = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Team Hall YT",
      start: "2026-03-02",
      className: "fullcalendar-info",
    },
    {
      id: "2",
      title: "Training Workshop",
      start: "2026-03-13T09:30:00",
      className: "fullcalendar-pink",
    },
    {
      id: "3",
      title: "Wellness Session",
      start: "2026-03-18",
      className: "fullcalendar-cyan",
    },
    {
      id: "4",
      title: "Team Activity",
      start: "2026-03-07",
      className: "fullcalendar-orange",
    },

    // WEEK SYNC - BOTH ALL DAY AND TIME SLOT
    {
      id: "5",
      title: "Weekly Sync",
      start: "2026-03-23",
      allDay: true,
      className: "fullcalendar-green",
    },

    // PROJECT DEMO - BOTH ALL DAY AND TIME SLOT
    {
      id: "6",
      title: "Project Demo",
      start: "2026-03-26",
      allDay: true,
      className: "fullcalendar-purple",
    },
  ]);

  const [show, setShow] = useState(false);
  const [eventData, setEventData] = useState<EventData>({});
  const [isEditable, setIsEditable] = useState(false);

  const createNewEvent = () => {
    // Get current date only (no time)
    const today = new Date().toISOString().split("T")[0];

    setEventData({
      title: "",
      start: today,
      className: "calendar-event-meeting",
    });
    setIsEditable(true);
    setShow(true);

    // Show the Add Event modal
    // const modal = document.getElementById("add_new");
    // if (modal) {
    //   const bsModal = Modal.getInstance(modal) || new Modal(modal);
    //   bsModal.show();
    // }
  };

  const onCloseModal = () => {
    setShow(false);
    setEventData({});
    setIsEditable(false);
  };

  const onAddEvent = (eventData: EventData) => {
    // Determine badge class based on event type
    let badgeClass = "badge bg-primary"; // default
    if (
      eventData.className?.includes("calendar-event-hiring") ||
      eventData.className?.includes("bg-soft-success")
    ) {
      badgeClass = "badge bg-soft-success";
    } else if (
      eventData.className?.includes("calendar-event-office") ||
      eventData.className?.includes("bg-soft-secondary")
    ) {
      badgeClass = "badge bg-soft-secondary";
    } else if (
      eventData.className?.includes("calendar-event-holiday") ||
      eventData.className?.includes("bg-soft-pink")
    ) {
      badgeClass = "badge bg-soft-pink";
    } else if (
      eventData.className?.includes("calendar-event-employee") ||
      eventData.className?.includes("bg-soft-warning")
    ) {
      badgeClass = "badge bg-soft-warning";
    }

    const newEvent = {
      id: Date.now().toString(),
      title: eventData.title || "",
      start: eventData.start || "",
      className: `${eventData.className || "calendar-event-meeting"} ${badgeClass}`,
    };
    setEvents([...events, newEvent]);
    onCloseModal();
  };

  const onUpdateEvent = (eventData: EventData) => {
    setEvents(
      events.map((event) =>
        event.id === eventData.id ? { ...event, ...eventData } : event,
      ),
    );
    onCloseModal();
  };

  const onRemoveEvent = (eventData: EventData) => {
    setEvents(events.filter((event) => event.id !== eventData.id));
    onCloseModal();
  };

  const onEventClick = (info: EventClickArg) => {
    // Prevent default behavior
    info.jsEvent.preventDefault();

    // Create popup element
    const popup = document.createElement("div");
    popup.className =
      "fc-event-popup fixed z-[9999] top-0 left-0 size-full overflow-x-hidden overflow-y-auto flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm flex-wrap";
    popup.innerHTML = `
      <div class="max-w-[400px] min-w-[300px] w-full p-6 bg-white border border-border-color rounded-lg shadow-xl mx-4">
        <div class="flex justify-between items-center mb-5 pb-5 border-b border-border-color">
          <h4>Event Details</h4>
          <button type="button" class="popup-close size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer">
            <i class="icon-x"></i>
          </button>
        </div>
        <div class="mb-5 pb-5 border-b border-border-color">
          <img class="mb-4 rounded-md w-full h-32 object-cover" src="/react/src/assets/img/bg/calendar.jpg" alt="calendar">
          <p class="font-semibold text-dark mb-2">${info.event.title}</p>
          <p class="mb-4 text-sm text-gray-600">An in company training workshop focused on enhancing employee skills through practical, hands on learning.</p>
          <p class="flex items-center gap-2 mb-3 text-sm">
            <i class="icon-calendar text-dark"></i>
            <span>${info.event.start ? info.event.start.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : ""}</span>
          </p>
          <p class="flex items-center gap-2 mb-3 text-sm">
            <i class="icon-clock text-dark"></i>
            ${info.event.allDay ? "All Day" : info.event.start ? info.event.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
          </p>
          <p class="flex items-center gap-2 text-sm">
            <i class="icon-map-pin text-dark"></i>
            Room 2A
          </p>
        </div>
        <div class="flex justify-between items-center">
          <div class="avatar-list-stacked">
            <img src="/src/assets/img/avatar/avatar-27.jpg" alt="JS" class="w-6 h-6 inline-flex items-center justify-center hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 rounded-full border border-border-color">
            <img src="/src/assets/img/avatar/avatar-28.jpg" alt="AR" class="w-6 h-6 inline-flex items-center justify-center hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 rounded-full border border-border-color">
            <img src="/src/assets/img/avatar/avatar-29.jpg" alt="KM" class="w-6 h-6 inline-flex items-center justify-center hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 rounded-full border border-border-color">
            <span class="w-6 h-6 inline-flex items-center justify-center hover:-translate-y-[0.188rem] text-[12px] bg-light text-dark -me-3.5 rounded-full border border-border-color"> 1+ </span>
          </div>
          <div class="flex items-center gap-2">
            <button data-hs-overlay="#edit-event" class="edit-event size-7 text-sm flex items-center cursor-pointer justify-center bg-white border border-border-color text-dark hover:text-primary rounded-full">
              <i class="icon-pencil-line"></i>
            </button>
            <button class="delete-event size-7 text-sm flex items-center justify-center bg-white border border-border-color text-dark hover:text-danger rounded-full">
              <i class="icon-trash-2"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Add popup to body
    document.body.appendChild(popup);

    // Handle close button
    const closeBtn = popup.querySelector(".popup-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        document.body.removeChild(popup);
      });
    }

    // Handle edit button
    const editBtn = popup.querySelector(".edit-event");
    if (editBtn) {
      editBtn.addEventListener("click", () => {
        document.body.removeChild(popup);
        // Open edit modal
        setEventData({
          id: info.event.id,
          title: info.event.title,
          start: info.event.startStr,
          className: Array.isArray(info.event.classNames)
            ? info.event.classNames.find((cls: string) =>
                cls.startsWith("calendar-event-"),
              ) || "calendar-event-meeting"
            : "calendar-event-meeting",
        });
        setIsEditable(true);
        setShow(true);
      });
    }

    // Handle delete button
    const deleteBtn = popup.querySelector(".delete-event");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        document.body.removeChild(popup);
        // Remove the event
        setEvents(events.filter((event) => event.id !== info.event.id));
      });
    }

    // Close popup when clicking outside
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        document.body.removeChild(popup);
      }
    });
  };

  const onDateClick = (info: DateClickArg) => {
    setEventData({
      title: "",
      start: info.dateStr,
      className: "calendar-event-meeting",
    });
    setIsEditable(true);
    setShow(true);

    // Show the Add Event modal
    // const modal = document.getElementById("add_new");
    // if (modal) {
    //   const bsModal = Modal.getInstance(modal) || new Modal(modal);
    //   bsModal.show();
    // }
  };

  const onDrop = (info: DropArg) => {
    const title =
      info.draggedEl.getAttribute("data-title") || info.draggedEl.innerText;

    // Find the className that starts with 'calendar-event-' to determine the color
    const className = info.draggedEl.className
      .split(" ")
      .find((cls: string) => cls.startsWith("calendar-event-"));

    // Determine badge class based on event type
    let badgeClass = "badge bg-info"; // default
    if (className?.includes("calendar-event-hiring")) {
      badgeClass = "badge bg-success";
    } else if (className?.includes("calendar-event-office")) {
      badgeClass = "badge bg-secondary";
    } else if (className?.includes("calendar-event-holiday")) {
      badgeClass = "badge bg-pink";
    } else if (className?.includes("calendar-event-employee")) {
      badgeClass = "badge bg-warning";
    }

    const newEvent = {
      id: Date.now().toString(),
      title: title,
      start: info.dateStr,
      className: `${className || "calendar-event-meeting"} ${badgeClass}`,
    };
    setEvents([...events, newEvent]);
  };

  const onEventDrop = (info: EventDropArg) => {
    setEvents(
      events.map((event) =>
        event.id === info.event.id
          ? { ...event, start: info.event.startStr }
          : event,
      ),
    );
  };

  return {
    events,
    show,
    eventData,
    isEditable,
    createNewEvent,
    onCloseModal,
    onAddEvent,
    onUpdateEvent,
    onRemoveEvent,
    onEventClick,
    onDateClick,
    onDrop,
    onEventDrop,
  };
};

const Calendar = () => {
  const {toggle,isOpen,containerRef } = useDropdown();
  const {
    events,
    onDateClick,
    onDrop,
    onEventClick,
    onEventDrop,
  } = useCalendar();

  const calendarRef = useRef(null);
  const externalEventsEle = useRef<HTMLDivElement | null>(null);
  const draggableInstance = useRef<Draggable | null>(null);

  // Stable props for FullCalendar
  const calendarPlugins = useMemo(
    () => [dayGridPlugin, timeGridPlugin, interactionPlugin],
    [],
  );
  const headerToolbar = useMemo(
    () => ({
      start: "prev,title,next",
      center: "dayGridMonth,timeGridWeek,timeGridDay",
      end: "today,addEvent",
    }),
    [],
  );
  const customButtons = {
    addEvent: {
      text: "+ New Event",
      click: function () {
        document
          .querySelector('[data-hs-overlay="#add-event"]')
          ?.dispatchEvent(new Event("click")); // safer
      },
    },
  };

  const buttonText = useMemo(
    () => ({
      today: "Today",
      month: "Month",
      week: "Week",
      day: "Day",
    }),
    [],
  );

  // Use FullCalendar's icon spans: <span class="fc-icon fc-icon-chevron-left" />
  const buttonIcons = useMemo(
    () => ({
      prev: "chevron-left",
      next: "chevron-right",
    }),
    [],
  );

  useEffect(() => {
    window.HSStaticMethods?.autoInit();
  }, []);
  // Memoized handlers to avoid recreating functions each render






  useEffect(() => {
    if (externalEventsEle.current) {
      draggableInstance.current = new Draggable(externalEventsEle.current, {
        itemSelector: ".external-event",
        eventData: function (eventEl: HTMLElement) {
          return {
            title: eventEl.getAttribute("data-title") || eventEl.innerText,
            classNames: eventEl.getAttribute("data-class"),
            // Use the className for styling instead of data-color
            className: eventEl.className
              .split(" ")
              .find((cls: string) => cls.startsWith("calendar-event-")),
          };
        },
      });
    }

    return () => {
      if (draggableInstance.current) {
        draggableInstance.current.destroy();
      }
    };
  }, []);

  // Fix accessibility issues for FullCalendar elements
  useEffect(() => {
    const fixCalendarAccessibility = () => {
      // Add aria-labels to all role="img" elements in FullCalendar
      const roleImgElements = document.querySelectorAll('[role="img"]');
      roleImgElements.forEach((element) => {
        if (!element.getAttribute("aria-label")) {
          if (element.classList.contains("fc-icon-chevron-left")) {
            element.setAttribute("aria-label", "Previous month");
          } else if (element.classList.contains("fc-icon-chevron-right")) {
            element.setAttribute("aria-label", "Next month");
          } else if (element.classList.contains("fc-icon-chevron-up")) {
            element.setAttribute("aria-label", "Previous week");
          } else if (element.classList.contains("fc-icon-chevron-down")) {
            element.setAttribute("aria-label", "Next week");
          }
        }
      });

      // Add aria-labels to navigation buttons
      const prevButton = document.querySelector(".fc-prev-button");
      const nextButton = document.querySelector(".fc-next-button");
      const todayButton = document.querySelector(".fc-today-button");

      if (prevButton && !prevButton.getAttribute("aria-label")) {
        prevButton.setAttribute("aria-label", "Previous month");
      }

      if (nextButton && !nextButton.getAttribute("aria-label")) {
        nextButton.setAttribute("aria-label", "Next month");
      }

      if (todayButton && !todayButton.getAttribute("aria-label")) {
        todayButton.setAttribute("aria-label", "Go to today");
      }
    };

    // Run after component mounts and after a short delay to ensure FullCalendar is rendered
    const timer = setTimeout(fixCalendarAccessibility, 100);

    // Also run when the calendar view changes
    const calendarElement = document.getElementById("calendar");
    if (calendarElement) {
      const observer = new MutationObserver(fixCalendarAccessibility);
      observer.observe(calendarElement, { childList: true, subtree: true });

      return () => {
        clearTimeout(timer);
        observer.disconnect();
      };
    }

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between flex-wrap page-breadcrumb gap-3 mb-6">
        <div className="my-auto">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  to={Path.dashboard}
                  className="inline-flex items-center gap-1 text-gray-600 hover:text-primary"
                >
                  <i className="icon icon-house" />
                  Home
                </Link>
              </li>
              <li>
                <span className="text-default">/</span>
              </li>
              <li aria-current="page" className="text-gray-900">
                Calendar
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div ref={containerRef} className="relative inline-flex">
            <button
              onClick={() => toggle("export1")}
              type="button"
              className="hs-dropdown-toggle cursor-pointer btn inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary  focus:border-primary focus:text-white  focus:outline-hidden"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <i className="icon-arrow-down-to-line"></i>Export
            </button>
 {isOpen("export1") && (
              <div
                  className=" absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-9"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="p-2 space-y-1">
                  <a
                    href="#"
                    className="flex items-center px-4 py-1.75 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  >
                    Export as PDF
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  >
                    Export as Excel
                  </a>
                </div>
              </div>
 )}
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Start grid */}
      <div className="grid grid-cols-1 calendar-wrapper">
        <div className="bg-white p-5 border border-border-color rounded-lg">
          <div id="calendar">
            <FullCalendar
              plugins={calendarPlugins}
              initialView="dayGridMonth"
              headerToolbar={headerToolbar}
              buttonText={buttonText}
              buttonIcons={buttonIcons}
              allDaySlot={true}
              eventClick={onEventClick}
              dateClick={onDateClick}
              drop={onDrop}
              customButtons={customButtons} 
              eventDrop={onEventDrop}
              ref={calendarRef}
              events={events}
              editable={true}
              selectable={true}
              droppable={true}
              eventContent={renderEventContent}
            />
          </div>
        </div>
      </div>
      <CalendarModal />
      {/* End grid */}
    </div>
  );
};

export default Calendar;
