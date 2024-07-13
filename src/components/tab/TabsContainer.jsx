import { useState } from "react"
import TabContent from "./TabContent"

export default function TabsContainer({ tabs }) {

  const [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <div>
      <ul className='flex gap-4'>
        {tabs.map((tab) => (
          <li
            className={`cursor-pointer rounded-md px-4 py-2 bg-[#0F0E17] ${tab.id === activeTab ? 'text-[#FF8906] font-bold' : 'text-[#FFFFFE]'}`}
            key={tab.id} onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        {tabs.map((tab) => (
          <TabContent key={tab.id}>
            {activeTab === tab.id && <p>{tab.content}</p>}
          </TabContent>
        ))}
      </div>
    </div>
  )
}