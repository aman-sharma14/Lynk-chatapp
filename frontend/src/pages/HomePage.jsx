import React, { useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';
import { ChevronLeft } from 'lucide-react';

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [sidebarHidden, setSidebarHidden] = useState(false);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden relative">
            {/* Sidebar with visibility toggle */}
            <div className={`transition-all duration-300 ${sidebarHidden ? 'w-0 overflow-hidden' : 'w-20 lg:w-72'}`}>
              <Sidebar />
            </div>

            {/* Toggle button positioned correctly depending on sidebar state */}
            <div 
              className="absolute top-5 z-50 md:hidden transition-all duration-300" 
              style={{ 
                left: sidebarHidden ? '10px' : '76px',
                transform: sidebarHidden ? 'translateX(0)' : 'translateX(-50%)'
              }}
            >
              <button 
                onClick={() => setSidebarHidden(!sidebarHidden)}
                className="bg-white hover:bg-base-200 rounded-full p-2 shadow-md border border-base-300"
              >
                <ChevronLeft className={`${sidebarHidden ? 'rotate-180' : ''}`} size={18} />
              </button>
            </div>

            {/* Main content area - expand to fill space when sidebar is hidden */}
            <div className="flex-1 flex flex-col relative">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer sidebarHidden={sidebarHidden} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage