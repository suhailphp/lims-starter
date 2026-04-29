import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { Link } from 'react-router-dom';
import { Path } from '../../../routes/path';
import ImageWithBasePath from '../../../components/image-with-base-path';
import { Images } from '../../../utils/imagePath';
import KanbanModal from './kanbanModal';
import { useDropdown } from '../../../hooks/useDropdown';

const Kanban = () => {
  
  const {toggle,isOpen,containerRef } = useDropdown();
  const [columns, setColumns] = useState({
    'drag-one': [
      { id: 'task-1', title: 'Smart Agent Hub', category: 'Design', categoryColor: 'pink', comments: 6, links: 3, description: 'Finalize dashboard layout, analytics widgets, and responsive behavior.', date: '20 Jan 2026', priority: 'High', priorityColor: 'danger', avatars: [Images.avatar_27, Images.avatar_28, Images.avatar_29], extra: '+2' },
      { id: 'task-2', title: 'Landing Page Wireframes', category: 'Wireframing', categoryColor: 'info', comments: 8, links: 3, description: 'Create wireframes for hero, features, testimonials, and CTA sections.', date: '20 Jan 2026', priority: 'Medium', priorityColor: 'warning', avatars: [Images.avatar_11, Images.avatar_12, Images.avatar_13], extra: '+2' }
    ],
    'drag-two': [
      { id: 'task-3', title: 'Feedback Implementation', category: 'Improvements', categoryColor: 'cyan', comments: 3, links: 2, description: 'Applied user feedback to improve navigation clarity and overall usability.', date: '16 Jan 2026', priority: 'Low', priorityColor: 'success', avatars: [Images.avatar_14, Images.avatar_15], extra: '' },
      { id: 'task-4', title: 'Subscription Plan Page', category: 'Design', categoryColor: 'pink', comments: 10, links: 3, description: 'Updated layout, pricing clarity & improved keyboard and screen reader support.', date: '14 Jan 2026', priority: 'High', priorityColor: 'danger', avatars: [Images.avatar_16, Images.avatar_17, Images.avatar_18], extra: '' },
      { id: 'task-5', title: 'UX Enhancements', category: 'Improvements', categoryColor: 'cyan', comments: 5, links: 2, description: 'Refined user journeys based on analytics insights and usability testing.', date: '14 Jan 2026', priority: 'Medium', priorityColor: 'warning', avatars: [Images.avatar_19, Images.avatar_20, Images.avatar_21], extra: '' }
    ],
    'drag-three': [
      { id: 'task-6', title: 'Email Signup Integration', category: 'Design', categoryColor: 'pink', comments: 6, links: 3, description: 'Design signup flow including validation, success messages, and error states.', date: '07 Jan 2026', priority: 'Medium', priorityColor: 'warning', avatars: [Images.avatar_22, Images.avatar_23], extra: '' },
      { id: 'task-7', title: 'Hero Section Animation Brief', category: 'Animation', categoryColor: 'orange', comments: 6, links: 3, description: 'Define animation ideas and interaction notes for development.', date: '08 Jan 2026', priority: 'Low', priorityColor: 'success', avatars: [Images.avatar_24, Images.avatar_25, Images.avatar_26], extra: '+2' }
    ]
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const sourceColumn = columns[source.droppableId as keyof typeof columns];
    const destColumn = columns[destination.droppableId as keyof typeof columns];

    const sourceItems = [...sourceColumn];
    const destItems = [...destColumn];

    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destItems
    });
  };

  const renderTaskCard = (task: any, index: number) => (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white border border-border-color mb-4 last:mb-0 rounded-lg p-[12px] shadow hover:shadow-lg transition"
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.5 : 1
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className={`badge-small rounded-md text-xs font-medium bg-${task.categoryColor}-50 text-${task.categoryColor} border border-${task.categoryColor}`}>
              {" "}
              {task.category}
            </span>
            <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
              <button
                type="button"
                className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
              >
                <i className="icon-ellipsis-vertical" />
              </button>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="p-2 space-y-1">
                  <button
                    type="button"
                    className="flex items-center w-full cursor-pointer hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="edit-task"
                    data-hs-overlay="#edit-task"
                  >
                    <i className="icon-pencil-line me-2" />
                    Edit
                  </button>
                  <Link
                    className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                    to="#"
                  >
                    <i className="icon-trash-2 me-2" />
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-border-color mb-4 pb-4">
            <h4 className="mb-2 font-bold text-[18px]">
              {task.title}
            </h4>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2">
                <i className="icon icon-message-square-text" />
                {task.comments}
              </span>
              <span className="flex items-center gap-2">
                <i className="icon icon-link" />
                {task.links}
              </span>
            </div>
          </div>
          <div className="border-b border-border-color mb-4 pb-4">
            <p>
              {task.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-1">
              <span className="badge-small rounded-md text-xs font-medium bg-light-50 text-dark bg-light border border-border-color flex items-center gap-1">
                {" "}
                <i className="icon-calendar-clock" /> {task.date}
              </span>
              <span className={`inline-flex items-center badge-small rounded-md text-xs font-medium bg-${task.priorityColor}-50 text-${task.priorityColor} border border-${task.priorityColor}`}>
                <span className={`bg-${task.priorityColor} w-[5px] h-[5px] block rounded-full me-1`} />
                {task.priority}
              </span>
            </span>
            <div className="avatar-list-stacked pe-[12px]">
              {task.avatars.map((avatar: any, idx: number) => (
                <ImageWithBasePath
                  key={idx}
                  className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                  src={avatar}
                  alt="img"
                />
              ))}
              {task.extra && (
                <Link
                  className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-light text-dark"
                  to="#"
                >
                  {" "}
                  {task.extra}{" "}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );

  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
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
                  Kanban Board
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
            <button
              type="button"
              className="btn bg-primary border border-primary text-white text-center flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800 hover:text-white"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="add-task"
              data-hs-overlay="#add-task"
            >
              <i className="icon-plus" /> New Task
            </button>
          </div>
        </div>
        {/* End Breadcrumb */}
        {/* Start grid */}
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div className="bg-white shadow rounded-md p-5 border border-border-color">
              <div className="flex flex-wrap gap-2 items-center justify-between mb-5 pb-5 border-b border-border-color">
                <div>
                  <label htmlFor="hs-table-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="hs-table-search"
                      id="hs-table-search"
                      className="block w-full py-2 ps-8 pe-3 rounded-lg border border-border-color bg-white text-gray-900 placeholder-gray-400 focus:ring-0"
                      placeholder="Search"
                    />
                    <div className="absolute top-1/2 start-3 -translate-y-1/2 pointer-events-none">
                      <i className="icon-search text-gray-900" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative rangepicker-input w-[198px]">
                    <span className="absolute inset-y-0 left-0 flex items-center px-3 text-muted-foreground text-dark">
                      <i className="icon-calendar-days" />
                    </span>
                    <input
                      type="text"
                      className="form-input inline-block w-full bg-light border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color pl-8! ps-8!"
                      data-provider="flatpickr"
                      data-date-format="d M y"
                      data-range-date="true"
                      defaultValue="01 Jan 26 to 20 Jan 26"
                      id="picker"
                    />
                  </div>
                  {/* Dropdown */}
                  <div>
                    <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                      <button
                        type="button"
                        className="hs-dropdown-toggle btn cursor-pointer inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        aria-label="Dropdown"
                      >
                        <i className="icon-arrow-up-narrow-wide" /> Newest
                      </button>
                      <div
                        className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                        role="menu"
                        aria-orientation="vertical"
                        tabIndex={-1}
                      >
                        <div className="p-2 space-y-1">
                          <Link
                            className="flex items-center px-4 py-2 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            Newest
                          </Link>
                          <Link
                            className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            Oldest
                          </Link>
                          <Link
                            className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            Recently Created
                          </Link>
                          <Link
                            className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            Last Modified
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Filter Dropdown */}
                </div>
              </div>
              <div className="flex overflow-auto items-baseline gap-4">
                {/* To Do Column */}
                <div className="w-[333px] min-w-[333px] overflow-auto bg-light rounded-lg p-5 border border-border-color">
                  <div className="flex justify-between items-center mb-[19px]">
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] flex justify-center items-center">
                        <i className="icon-chart-pie text-dark" />
                      </span>
                      <h4>To Do</h4>
                      <span className="badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
                        {" "}
                        {columns['drag-one'].length.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                      aria-haspopup="dialog"
                      aria-expanded="false"
                      aria-controls="add-task"
                      data-hs-overlay="#add-task"
                    >
                      <i className="icon-plus" />
                    </button>
                  </div>
                  <Droppable droppableId="drag-one">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {columns['drag-one'].map((task, index) => renderTaskCard(task, index))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
                {/* In Progress Column */}
                <div className="w-[333px] min-w-[333px] overflow-auto bg-light rounded-lg p-5 border border-border-color">
                  <div className="flex justify-between items-center mb-[19px]">
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] flex justify-center items-center">
                        <i className="icon-hourglass text-dark" />
                      </span>
                      <h4>In Progress</h4>
                      <span className="badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
                        {" "}
                        {columns['drag-two'].length.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                      aria-haspopup="dialog"
                      aria-expanded="false"
                      aria-controls="add-task"
                      data-hs-overlay="#add-task"
                    >
                      <i className="icon-plus" />
                    </button>
                  </div>
                  <Droppable droppableId="drag-two">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {columns['drag-two'].map((task, index) => renderTaskCard(task, index))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
                {/* Completed Column */}
                <div className="w-[333px] min-w-[333px] overflow-auto bg-light rounded-lg p-5 border border-border-color">
                  <div className="flex justify-between items-center mb-[19px]">
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] flex justify-center items-center">
                        <i className="icon-circle-check text-dark" />
                      </span>
                      <h4>Completed</h4>
                      <span className="badge rounded-lg text-xs font-medium bg-primary-50 text-primary border border-primary">
                        {" "}
                        {columns['drag-three'].length.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                      aria-haspopup="dialog"
                      aria-expanded="false"
                      aria-controls="add-task"
                      data-hs-overlay="#add-task"
                    >
                      <i className="icon-plus" />
                    </button>
                  </div>
                  <Droppable droppableId="drag-three">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {columns['drag-three'].map((task, index) => renderTaskCard(task, index))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End grid */}
      </div>
    </DragDropContext>
    <KanbanModal/>
   </>
  );
};

export default Kanban;