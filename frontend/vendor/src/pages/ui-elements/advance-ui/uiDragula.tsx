import { Link } from "react-router-dom"
import { Path } from "../../../routes/path"
import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Images } from "../../../utils/imagePath"
import { useCodeToggle } from "../../../hooks/useCodeToggle"

const UiDragula = () => {
  const { showCode, copied, handleShowCode, handleCopy } = useCodeToggle()

  const [simpleItems, setSimpleItems] = useState([
    { id: 'item-1', color: 'bg-primary' },
    { id: 'item-2', color: 'bg-success' },
    { id: 'item-3', color: 'bg-warning' },
    { id: 'item-4', color: 'bg-danger' },
    { id: 'item-5', color: 'bg-info' },
    { id: 'item-6', color: 'bg-dark' },
  ])

  const [leftItems, setLeftItems] = useState([
    { id: 'left-1', name: 'Luoise K. Bond', role: 'Founder & CEO', avatar: Images.avatar_01 },
    { id: 'left-2', name: 'James M. Short', role: 'Software Engineer', avatar: Images.avatar_02 },
    { id: 'left-3', name: 'Susan J. Sander', role: 'Web Designer', avatar: Images.avatar_03 },
  ])

  const [rightItems, setRightItems] = useState([
    { id: 'right-1', name: 'Dennis N. Cloutier', role: 'Web Developer', avatar: Images.avatar_04 },
    { id: 'right-2', name: 'Gabriel J. Snyder', role: 'Business Analyst', avatar: Images.avatar_05 },
    { id: 'right-3', name: 'Louie C. Mason', role: 'Human Resources', avatar: Images.avatar_06 },
  ])

  const [handleLeftItems, setHandleLeftItems] = useState([
    { id: 'handle-left-1', name: 'Luoise K. Bond', role: 'Founder & CEO', avatar: Images.avatar_07 },
    { id: 'handle-left-2', name: 'Dennis N. Cloutier', role: 'Software Engineer', avatar: Images.avatar_08 },
    { id: 'handle-left-3', name: 'Susan J. Sander', role: 'Web Designer', avatar: Images.avatar_09 },
  ])

  const [handleRightItems, setHandleRightItems] = useState([
    { id: 'handle-right-1', name: 'Gabriel J. Snyder', role: 'Web Developer', avatar: Images.avatar_10 },
    { id: 'handle-right-2', name: 'James M. Short', role: 'Business Analyst', avatar: Images.avatar_12 },
    { id: 'handle-right-3', name: 'Louie C. Mason', role: 'Human Resources', avatar: Images.avatar_13 },
  ])

  const onDragEnd = (result: any) => {
    const { source, destination } = result

    if (!destination) return

    // Simple drag and drop
    if (source.droppableId === 'simple-dragula' && destination.droppableId === 'simple-dragula') {
      const newItems = Array.from(simpleItems)
      const [reorderedItem] = newItems.splice(source.index, 1)
      newItems.splice(destination.index, 0, reorderedItem)
      setSimpleItems(newItems)
    }

    // Move between containers
    if (source.droppableId === 'company-list-left' || source.droppableId === 'company-list-right') {
      if (destination.droppableId === 'company-list-left' || destination.droppableId === 'company-list-right') {
        const sourceList = source.droppableId === 'company-list-left' ? leftItems : rightItems
        const destList = destination.droppableId === 'company-list-left' ? leftItems : rightItems
        const setSourceList = source.droppableId === 'company-list-left' ? setLeftItems : setRightItems
        const setDestList = destination.droppableId === 'company-list-left' ? setLeftItems : setRightItems

        if (source.droppableId === destination.droppableId) {
          const newItems = Array.from(sourceList)
          const [reorderedItem] = newItems.splice(source.index, 1)
          newItems.splice(destination.index, 0, reorderedItem)
          setSourceList(newItems)
        } else {
          const newSourceItems = Array.from(sourceList)
          const newDestItems = Array.from(destList)
          const [movedItem] = newSourceItems.splice(source.index, 1)
          newDestItems.splice(destination.index, 0, movedItem)
          setSourceList(newSourceItems)
          setDestList(newDestItems)
        }
      }
    }

    // Move between containers with handle
    if (source.droppableId === 'handle-dragula-left' || source.droppableId === 'handle-dragula-right') {
      if (destination.droppableId === 'handle-dragula-left' || destination.droppableId === 'handle-dragula-right') {
        const sourceList = source.droppableId === 'handle-dragula-left' ? handleLeftItems : handleRightItems
        const destList = destination.droppableId === 'handle-dragula-left' ? handleLeftItems : handleRightItems
        const setSourceList = source.droppableId === 'handle-dragula-left' ? setHandleLeftItems : setHandleRightItems
        const setDestList = destination.droppableId === 'handle-dragula-left' ? setHandleLeftItems : setHandleRightItems

        if (source.droppableId === destination.droppableId) {
          const newItems = Array.from(sourceList)
          const [reorderedItem] = newItems.splice(source.index, 1)
          newItems.splice(destination.index, 0, reorderedItem)
          setSourceList(newItems)
        } else {
          const newSourceItems = Array.from(sourceList)
          const newDestItems = Array.from(destList)
          const [movedItem] = newSourceItems.splice(source.index, 1)
          newDestItems.splice(destination.index, 0, movedItem)
          setSourceList(newSourceItems)
          setDestList(newDestItems)
        }
      }
    }
  }

  return (
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
                <li className="inline-flex items-center">
                  <span className="text-gray-600">UI Elements</span>
                </li>
                <li>
                  <span className="text-default">/</span>
                </li>
                <li aria-current="page" className="text-gray-900">
                  Dragula
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Start grid */}
        <div className="grid grid-cols-1 gap-6">
          <div className="preview-card bg-white rounded-md border border-border-color p-5">
            <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
              <h5>Simple Drag and Drop Example</h5>
              <button
                type="button"
                onClick={() => handleShowCode(1)}
                data-toggle="code"
                className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
              >
                <i className="icon icon-eye" />
                <span className="code-btn">Show Code</span>
              </button>
            </div>
            <Droppable droppableId="simple-dragula">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`preview-content grid grid-cols-1 xl:grid-cols-3 gap-6 ${showCode[1] ? 'hidden' : ''}`}
                  id="simple-dragula"
                >
                  {simpleItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-5 rounded-lg text-white ${item.color}`}
                        >
                          <p className="mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                            posuere erat a ante.
                          </p>
                          <p>
                            Someone famous in <em>Source Title</em>
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[1] ? '' : 'hidden'}`}>
              <button
                type="button"
                onClick={() => handleCopy(1, `<div class="preview-content grid grid-cols-1 xl:grid-cols-3 gap-6" id="simple-dragula" data-plugin="dragula">
\t<div class="p-5 bg-primary rounded-lg text-white">
\t\t<p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
\t\t<p>Someone famous in <em>Source Title</em></p>
\t</div>
\t<div class="p-5 bg-success rounded-lg text-white">
\t\t<p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
\t\t<p>Someone famous in <em>Source Title</em></p>
\t</div>
\t<div class="p-5 bg-warning rounded-lg text-white">
\t\t<p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
\t\t<p>Someone famous in <em>Source Title</em></p>
\t</div>
\t<div class="p-5 bg-danger rounded-lg text-white">
\t\t<p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
\t\t<p>Someone famous in <em>Source Title</em></p>
\t</div>
\t<div class="p-5 bg-info rounded-lg text-white">
\t\t<p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
\t\t<p>Someone famous in <em>Source Title</em></p>
\t</div>
\t<div class="p-5 bg-dark rounded-lg text-white">
\t\t<p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
\t\t<p>Someone famous in <em>Source Title</em></p>
\t</div>
</div>`)}
                className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
              >
                <i className="icon icon-copy" />
                <span>{copied[1] ? 'Copied!' : 'Copy'}</span>
              </button>
              {"\n"}
              <code className="language-html block w-full max-h-[400px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
                {"\n"}&lt;div class="preview-content grid grid-cols-1 xl:grid-cols-3
                gap-6" id="simple-dragula" data-plugin="dragula"&gt;{"\n"}
                {"\t"}&lt;div class="p-5 bg-primary rounded-lg text-white"&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;p class="mb-4"&gt;Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Integer posuere erat a ante.&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;p&gt;Someone famous in &lt;em&gt;Source
                Title&lt;/em&gt;&lt;/p&gt; {"\n"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}&lt;div class="p-5 bg-success rounded-lg text-white"&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;p class="mb-4"&gt;Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Integer posuere erat a ante.&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;p&gt;Someone famous in &lt;em&gt;Source
                Title&lt;/em&gt;&lt;/p&gt; {"\n"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}&lt;div class="p-5 bg-warning rounded-lg text-white"&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;p class="mb-4"&gt;Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Integer posuere erat a ante.&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;p&gt;Someone famous in &lt;em&gt;Source
                Title&lt;/em&gt;&lt;/p&gt; {"\n"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}&lt;div class="p-5 bg-danger rounded-lg text-white"&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;p class="mb-4"&gt;Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Integer posuere erat a ante.&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;p&gt;Someone famous in &lt;em&gt;Source
                Title&lt;/em&gt;&lt;/p&gt; {"\n"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}&lt;div class="p-5 bg-info rounded-lg text-white"&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;p class="mb-4"&gt;Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Integer posuere erat a ante.&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;p&gt;Someone famous in &lt;em&gt;Source
                Title&lt;/em&gt;&lt;/p&gt; {"\n"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}&lt;div class="p-5 bg-dark rounded-lg text-white"&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;p class="mb-4"&gt;Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Integer posuere erat a ante.&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;p&gt;Someone famous in &lt;em&gt;Source
                Title&lt;/em&gt;&lt;/p&gt; {"\n"}
                {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
              </code>
              {"\n"}
            </pre>
          </div>{" "}
          {/* end card */}
          <div className="preview-card bg-white rounded-md border border-border-color p-5">
            <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
              <h5>Move stuff between containers</h5>
              <button
                type="button"
                onClick={() => handleShowCode(2)}
                data-toggle="code"
                className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
              >
                <i className="icon icon-eye" />
                <span className="code-btn">Show Code</span>
              </button>
            </div>
            <div className={`preview-content grid grid-cols-1 xl:grid-cols-2 gap-6 ${showCode[2] ? 'hidden' : ''}`}>
              <div className="col-span-1 p-5 bg-light rounded-lg">
                <h5>Part 1</h5>
                <Droppable droppableId="company-list-left">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex flex-col gap-4 mt-8"
                      id="company-list-left"
                    >
                      {leftItems.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex sm:flex-row flex-col items-start gap-3 p-4 border border-border-color rounded-lg bg-white"
                            >
                              <img
                                src={item.avatar}
                                className="size-10 rounded-full border border-border-color"
                                alt="user-image"
                              />
                              <div>
                                <h5 className="text-[16px] mb-1">{item.name}</h5>
                                <p className="text-xs mb-3">{item.role}</p>
                                <em className="text-xs">
                                  Disrupt pork belly poutine, asymmetrical tousled succulents
                                  selfies. You probably haven't heard of them tattooed master
                                  cleanse live-edge keffiyeh.
                                </em>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              <div className="col-span-1 p-5 bg-light rounded-lg">
                <h5>Part 2</h5>
                <Droppable droppableId="company-list-right">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex flex-col gap-4 mt-8"
                      id="company-list-right"
                    >
                      {rightItems.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex sm:flex-row flex-col items-start gap-3 p-4 border border-border-color rounded-lg bg-white"
                            >
                              <img
                                src={item.avatar}
                                className="size-10 rounded-full border border-border-color"
                                alt="user-image"
                              />
                              <div>
                                <h5 className="text-[16px] mb-1">{item.name}</h5>
                                <p className="text-xs mb-3">{item.role}</p>
                                <em className="text-xs">
                                  Disrupt pork belly poutine, asymmetrical tousled succulents
                                  selfies. You probably haven't heard of them tattooed master
                                  cleanse live-edge keffiyeh.
                                </em>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
            <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[2] ? '' : 'hidden'}`}>
              <button
                type="button"
                onClick={() => handleCopy(2, `<div class="preview-content grid grid-cols-1 xl:grid-cols-2 gap-6" data-plugin="dragula" data-containers='["company-list-left", "company-list-right"]'>
\t<div class="col-span-1 p-5 bg-light rounded-lg">
\t\t<h5>Part 1</h5>
\t\t<div class="flex flex-col gap-4 mt-8" id="company-list-left">
\t\t\t<div class="flex sm:flex-row flex-col items-start gap-3 p-4 border border-border-color rounded-lg bg-white">
\t\t\t\t<img src="assets/img/avatar/avatar-01.jpg" class="size-10 rounded-full border border-border-color" alt="user-image">
\t\t\t\t<div>
\t\t\t\t\t<h5 class="text-[16px] mb-1">Luoise K. Bond</h5>
\t\t\t\t\t<p class="text-xs mb-3">Founder &amp; CEO</p>
\t\t\t\t\t<em class="text-xs">Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.</em>
\t\t\t\t</div>
\t\t\t</div>
\t\t\t<div class="flex sm:flex-row flex-col items-start gap-3 p-4 border border-border-color rounded-lg bg-white">
\t\t\t\t<img src="assets/img/avatar/avatar-02.jpg" class="size-10 rounded-full border border-border-color" alt="user-image">
\t\t\t\t<div>
\t\t\t\t\t<h5 class="text-[16px] mb-1">James M. Short</h5>
\t\t\t\t\t<p class="text-xs mb-3">Software Engineer</p>
\t\t\t\t\t<em class="text-xs">Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.</em>
\t\t\t\t</div>
\t\t\t</div>
\t\t\t<div class="flex sm:flex-row flex-col items-start gap-3 p-4 border border-border-color rounded-lg bg-white">
\t\t\t\t<img src="assets/img/avatar/avatar-03.jpg" class="size-10 rounded-full border border-border-color" alt="user-image">
\t\t\t\t<div>
\t\t\t\t\t<h5 class="text-[16px] mb-1">Susan J. Sander</h5>
\t\t\t\t\t<p class="text-xs mb-3">Web Designer</p>
\t\t\t\t\t<em class="text-xs">Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.</em>
\t\t\t\t</div>
\t\t\t</div>
\t\t</div>
\t</div>
\t<div class="col-span-1 p-5 bg-light rounded-lg">
\t\t<h5>Part 2</h5>
\t\t<div class="flex flex-col gap-4 mt-8" id="company-list-right">
\t\t\t<div class="flex sm:flex-row flex-col items-start gap-3 p-4 border border-border-color rounded-lg bg-white">
\t\t\t\t<img src="assets/img/avatar/avatar-04.jpg" class="size-10 rounded-full border border-border-color" alt="user-image">
\t\t\t\t<div>
\t\t\t\t\t<h5 class="text-[16px] mb-1">Dennis N. Cloutier</h5>
\t\t\t\t\t<p class="text-xs mb-3">Web Developer</p>
\t\t\t\t\t<em class="text-xs">Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.</em>
\t\t\t\t</div>
\t\t\t</div>
\t\t\t<div class="flex sm:flex-row flex-col items-start gap-3 p-4 border border-border-color rounded-lg bg-white">
\t\t\t\t<img src="assets/img/avatar/avatar-05.jpg" class="size-10 rounded-full border border-border-color" alt="user-image">
\t\t\t\t<div>
\t\t\t\t\t<h5 class="text-[16px] mb-1">Gabriel J. Snyder</h5>
\t\t\t\t\t<p class="text-xs mb-3">Business Analyst</p>
\t\t\t\t\t<em class="text-xs">Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.</em>
\t\t\t\t</div>
\t\t\t</div>
\t\t\t<div class="flex sm:flex-row flex-col items-start gap-3 p-4 border border-border-color rounded-lg bg-white">
\t\t\t\t<img src="assets/img/avatar/avatar-06.jpg" class="size-10 rounded-full border border-border-color" alt="user-image">
\t\t\t\t<div>
\t\t\t\t\t<h5 class="text-[16px] mb-1">Louie C. Mason</h5>
\t\t\t\t\t<p class="text-xs mb-3">Human Resources</p>
\t\t\t\t\t<em class="text-xs">Disrupt pork belly poutine, asymmetrical tousled succulents selfies. You probably haven't heard of them tattooed master cleanse live-edge keffiyeh.</em>
\t\t\t\t</div>
\t\t\t</div>
\t\t</div>
\t</div>
</div>`)}
                className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
              >
                <i className="icon icon-copy" />
                <span>{copied[2] ? 'Copied!' : 'Copy'}</span>
              </button>
              {"\n"}
              <code className="language-html block w-full max-h-[400px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
                {"\n"}&lt;div class="preview-content grid grid-cols-1 xl:grid-cols-2
                gap-6" data-plugin="dragula" data-containers='["company-list-left",
                "company-list-right"]'&gt;{"\n"}
                {"\t"}&lt;div class="col-span-1 p-5 bg-light rounded-lg"&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;h5&gt;Part 1&lt;/h5&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;div class="flex flex-col gap-4 mt-8"
                id="company-list-left"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex sm:flex-row flex-col items-start gap-3 p-4
                border border-border-color rounded-lg bg-white"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;img src="assets/img/avatar/avatar-01.jpg" class="size-10
                rounded-full border border-border-color" alt="user-image"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;h5 class="text-[16px] mb-1"&gt;Luoise K. Bond&lt;/h5&gt;
                {"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;p class="text-xs mb-3"&gt;Founder &amp; CEO&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;em class="text-xs"&gt;Disrupt pork belly poutine,
                asymmetrical tousled succulents selfies. You probably haven't heard of
                them tattooed master cleanse live-edge keffiyeh.&lt;/em&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex sm:flex-row flex-col items-start gap-3 p-4
                border border-border-color rounded-lg bg-white"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;img src="assets/img/avatar/avatar-02.jpg" class="size-10
                rounded-full border border-border-color" alt="user-image"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;h5 class="text-[16px] mb-1"&gt;James M. Short&lt;/h5&gt;
                {"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;p class="text-xs mb-3"&gt;Software Engineer&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;em class="text-xs"&gt;Disrupt pork belly poutine,
                asymmetrical tousled succulents selfies. You probably haven't heard of
                them tattooed master cleanse live-edge keffiyeh.&lt;/em&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex sm:flex-row flex-col items-start gap-3 p-4
                border border-border-color rounded-lg bg-white"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;img src="assets/img/avatar/avatar-03.jpg" class="size-10
                rounded-full border border-border-color" alt="user-image"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;h5 class="text-[16px] mb-1"&gt;Susan J. Sander&lt;/h5&gt;
                {"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;p class="text-xs mb-3"&gt;Web Designer&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;em class="text-xs"&gt;Disrupt pork belly poutine,
                asymmetrical tousled succulents selfies. You probably haven't heard of
                them tattooed master cleanse live-edge keffiyeh.&lt;/em&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}&lt;div class="col-span-1 p-5 bg-light rounded-lg"&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;h5&gt;Part 2&lt;/h5&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;div class="flex flex-col gap-4 mt-8"
                id="company-list-right"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex sm:flex-row flex-col items-start gap-3 p-4
                border border-border-color rounded-lg bg-white"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;img src="assets/img/avatar/avatar-04.jpg" class="size-10
                rounded-full border border-border-color" alt="user-image"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;h5 class="text-[16px] mb-1"&gt;Dennis N. Cloutier&lt;/h5&gt;
                {"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;p class="text-xs mb-3"&gt;Web Developer&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;em class="text-xs"&gt;Disrupt pork belly poutine,
                asymmetrical tousled succulents selfies. You probably haven't heard of
                them tattooed master cleanse live-edge keffiyeh.&lt;/em&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex sm:flex-row flex-col items-start gap-3 p-4
                border border-border-color rounded-lg bg-white"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;img src="assets/img/avatar/avatar-05.jpg" class="size-10
                rounded-full border border-border-color" alt="user-image"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;h5 class="text-[16px] mb-1"&gt;Gabriel J. Snyder&lt;/h5&gt;
                {"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;p class="text-xs mb-3"&gt;Business Analyst&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;em class="text-xs"&gt;Disrupt pork belly poutine,
                asymmetrical tousled succulents selfies. You probably haven't heard of
                them tattooed master cleanse live-edge keffiyeh.&lt;/em&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex sm:flex-row flex-col items-start gap-3 p-4
                border border-border-color rounded-lg bg-white"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;img src="assets/img/avatar/avatar-06.jpg" class="size-10
                rounded-full border border-border-color" alt="user-image"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;h5 class="text-[16px] mb-1"&gt;Louie C. Mason&lt;/h5&gt;
                {"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;p class="text-xs mb-3"&gt;Human Resources&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;em class="text-xs"&gt;Disrupt pork belly poutine,
                asymmetrical tousled succulents selfies. You probably haven't heard of
                them tattooed master cleanse live-edge keffiyeh.&lt;/em&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
              </code>
              {"\n"}
            </pre>
          </div>{" "}
          {/* end card */}
          <div className="preview-card bg-white rounded-md border border-border-color p-5">
            <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
              <h5>Move stuff between containers using handle</h5>
              <button
                type="button"
                onClick={() => handleShowCode(3)}
                data-toggle="code"
                className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
              >
                <i className="icon icon-eye" />
                <span className="code-btn">Show Code</span>
              </button>
            </div>
            <div className={`preview-content grid grid-cols-1 xl:grid-cols-2 gap-6 ${showCode[3] ? 'hidden' : ''}`}>
              <div className="col-span-1 p-5 bg-light rounded-lg">
                <h5>Part 1</h5>
                <Droppable droppableId="handle-dragula-left">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex flex-col gap-4 mt-8"
                      id="handle-dragula-left"
                    >
                      {handleLeftItems.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center justify-between p-4 border border-border-color rounded-lg bg-white"
                            >
                              <div className="flex flex-wrap items-center gap-2">
                                <img
                                  src={item.avatar}
                                  className="size-10 rounded-full border border-border-color"
                                  alt="user-image"
                                />
                                <div>
                                  <h5 className="text-[16px]">{item.name}</h5>
                                  <p className="text-xs">{item.role}</p>
                                </div>
                              </div>
                              <div {...provided.dragHandleProps} className="icon icon-move cursor-move dragula-handle" />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              <div className="col-span-1 p-5 bg-light rounded-lg">
                <h5>Part 2</h5>
                <Droppable droppableId="handle-dragula-right">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex flex-col gap-4 mt-8"
                      id="handle-dragula-right"
                    >
                      {handleRightItems.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center justify-between p-4 border border-border-color rounded-lg bg-white"
                            >
                              <div className="flex flex-wrap items-center gap-2">
                                <img
                                  src={item.avatar}
                                  className="size-10 rounded-full border border-border-color"
                                  alt="user-image"
                                />
                                <div>
                                  <h5 className="text-[16px]">{item.name}</h5>
                                  <p className="text-xs">{item.role}</p>
                                </div>
                              </div>
                              <div {...provided.dragHandleProps} className="icon icon-move cursor-move dragula-handle" />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
            <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[3] ? '' : 'hidden'}`}>
              <button
                type="button"
                onClick={() => handleCopy(3, `<div class="preview-content grid grid-cols-1 xl:grid-cols-2 gap-6" data-plugin="dragula" data-containers='["handle-dragula-left", "handle-dragula-right"]' data-handleClass="dragula-handle">
\t<div class="col-span-1 p-5 bg-light rounded-lg">
\t\t<h5>Part 1</h5>
\t\t<div class="flex flex-col gap-4 mt-8" id="handle-dragula-left">
\t\t\t<div class="flex items-center justify-between p-4 border border-border-color rounded-lg bg-white">
\t\t\t\t<div class="flex items-center gap-2">
\t\t\t\t\t<img src="assets/img/avatar/avatar-07.jpg" class="size-10 rounded-full border border-border-color" alt="user-image">
\t\t\t\t\t<div>
\t\t\t\t\t\t<h5 class="text-[16px]">Luoise K. Bond</h5>
\t\t\t\t\t\t<p class="text-xs">Founder &amp; CEO</p>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t<i class="icon icon-move cursor-move dragula-handle"></i>
\t\t\t</div>
\t\t\t<div class="flex items-center justify-between p-4 border border-border-color rounded-lg bg-white">
\t\t\t\t<div class="flex items-center gap-2">
\t\t\t\t\t<img src="assets/img/avatar/avatar-08.jpg" class="size-10 rounded-full border border-border-color" alt="user-image">
\t\t\t\t\t<div>
\t\t\t\t\t\t<h5 class="text-[16px]">Dennis N. Cloutier</h5>
\t\t\t\t\t\t<p class="text-xs">Software Engineer</p>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t<i class="icon icon-move cursor-move dragula-handle"></i>
\t\t\t</div>
\t\t\t<div class="flex items-center justify-between p-4 border border-border-color rounded-lg bg-white">
\t\t\t\t<div class="flex items-center gap-2">
\t\t\t\t\t<img src="assets/img/avatar/avatar-09.jpg" class="size-10 rounded-full border border-border-color" alt="user-image">
\t\t\t\t\t<div>
\t\t\t\t\t\t<h5 class="text-[16px]">Susan J. Sander</h5>
\t\t\t\t\t\t<p class="text-xs">Web Designer</p>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t<i class="icon icon-move cursor-move dragula-handle"></i>
\t\t\t</div>
\t\t</div>
\t</div>
\t<div class="col-span-1 p-5 bg-light rounded-lg">
\t\t<h5>Part 2</h5>
\t\t<div class="flex flex-col gap-4 mt-8" id="handle-dragula-right">
\t\t\t<div class="flex items-center justify-between p-4 border border-border-color rounded-lg bg-white">
\t\t\t\t<div class="flex items-center gap-2">
\t\t\t\t\t<img src="assets/img/avatar/avatar-10.jpg" class="size-10 rounded-full border border-border-color" alt="user-image">
\t\t\t\t\t<div>
\t\t\t\t\t\t<h5 class="text-[16px]">Gabriel J. Snyder</h5>
\t\t\t\t\t\t<p class="text-xs">Web Developer</p>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t<i class="icon icon-move cursor-move dragula-handle"></i>
\t\t\t</div>
\t\t\t<div class="flex items-center justify-between p-4 border border-border-color rounded-lg bg-white">
\t\t\t\t<div class="flex items-center gap-2">
\t\t\t\t\t<img src="assets/img/avatar/avatar-12.jpg" class="size-10 rounded-full border border-border-color" alt="user-image">
\t\t\t\t\t<div>
\t\t\t\t\t\t<h5 class="text-[16px]">James M. Short</h5>
\t\t\t\t\t\t<p class="text-xs">Business Analyst</p>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t<i class="icon icon-move cursor-move dragula-handle"></i>
\t\t\t</div>
\t\t\t<div class="flex items-center justify-between p-4 border border-border-color rounded-lg bg-white">
\t\t\t\t<div class="flex items-center gap-2">
\t\t\t\t\t<img src="assets/img/avatar/avatar-13.jpg" class="size-10 rounded-full border border-border-color" alt="user-image">
\t\t\t\t\t<div>
\t\t\t\t\t\t<h5 class="text-[16px]">Louie C. Mason</h5>
\t\t\t\t\t\t<p class="text-xs">Human Resources</p>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t<i class="icon icon-move cursor-move dragula-handle"></i>
\t\t\t</div>
\t\t</div>
\t</div>
</div>`)}
                className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
              >
                <i className="icon icon-copy" />
                <span>{copied[3] ? 'Copied!' : 'Copy'}</span>
              </button>
              {"\n"}
              <code className="language-html block w-full max-h-[400px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
                {"\n"}&lt;div class="preview-content grid grid-cols-1 xl:grid-cols-2
                gap-6" data-plugin="dragula" data-containers='["handle-dragula-left",
                "handle-dragula-right"]' data-handleClass="dragula-handle"&gt;{"\n"}
                {"\t"}&lt;div class="col-span-1 p-5 bg-light rounded-lg"&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;h5&gt;Part 1&lt;/h5&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;div class="flex flex-col gap-4 mt-8"
                id="handle-dragula-left"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex items-center justify-between p-4 border
                border-border-color rounded-lg bg-white"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex items-center gap-2"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;img src="assets/img/avatar/avatar-07.jpg" class="size-10
                rounded-full border border-border-color" alt="user-image"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;h5 class="text-[16px]"&gt;Luoise K. Bond&lt;/h5&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;p class="text-xs"&gt;Founder &amp; CEO&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;i class="icon icon-move cursor-move
                dragula-handle"&gt;&lt;/i&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex items-center justify-between p-4 border
                border-border-color rounded-lg bg-white"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex items-center gap-2"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;img src="assets/img/avatar/avatar-08.jpg" class="size-10
                rounded-full border border-border-color" alt="user-image"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;h5 class="text-[16px]"&gt;Dennis N. Cloutier&lt;/h5&gt;
                {"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;p class="text-xs"&gt;Software Engineer&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;i class="icon icon-move cursor-move
                dragula-handle"&gt;&lt;/i&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex items-center justify-between p-4 border
                border-border-color rounded-lg bg-white"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex items-center gap-2"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;img src="assets/img/avatar/avatar-09.jpg" class="size-10
                rounded-full border border-border-color" alt="user-image"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;h5 class="text-[16px]"&gt;Susan J. Sander&lt;/h5&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;p class="text-xs"&gt;Web Designer&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;i class="icon icon-move cursor-move
                dragula-handle"&gt;&lt;/i&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt; {"\n"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}&lt;div class="col-span-1 p-5 bg-light rounded-lg"&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;h5&gt;Part 2&lt;/h5&gt;{"\n"}
                {"\t"}
                {"\t"}&lt;div class="flex flex-col gap-4 mt-8"
                id="handle-dragula-right"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex items-center justify-between p-4 border
                border-border-color rounded-lg bg-white"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex items-center gap-2"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;img src="assets/img/avatar/avatar-10.jpg" class="size-10
                rounded-full border border-border-color" alt="user-image"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;h5 class="text-[16px]"&gt;Gabriel J. Snyder&lt;/h5&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;p class="text-xs"&gt;Web Developer&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;i class="icon icon-move cursor-move
                dragula-handle"&gt;&lt;/i&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex items-center justify-between p-4 border
                border-border-color rounded-lg bg-white"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex items-center gap-2"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;img src="assets/img/avatar/avatar-12.jpg" class="size-10
                rounded-full border border-border-color" alt="user-image"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;h5 class="text-[16px]"&gt;James M. Short&lt;/h5&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;p class="text-xs"&gt;Business Analyst&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;i class="icon icon-move cursor-move
                dragula-handle"&gt;&lt;/i&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex items-center justify-between p-4 border
                border-border-color rounded-lg bg-white"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div class="flex items-center gap-2"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;img src="assets/img/avatar/avatar-13.jpg" class="size-10
                rounded-full border border-border-color" alt="user-image"&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;h5 class="text-[16px]"&gt;Louie C. Mason&lt;/h5&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;p class="text-xs"&gt;Human Resources&lt;/p&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;i class="icon icon-move cursor-move
                dragula-handle"&gt;&lt;/i&gt;{"\n"}
                {"\t"}
                {"\t"}
                {"\t"}&lt;/div&gt; {"\n"}
                {"\t"}
                {"\t"}&lt;/div&gt;{"\n"}
                {"\t"}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
              </code>
              {"\n"}
            </pre>
          </div>{" "}
          {/* end card */}
        </div>
        {/* End grid */}
      </div>
    </DragDropContext>
  )
}

export default UiDragula
