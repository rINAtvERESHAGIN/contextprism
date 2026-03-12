import { PropsWithChildren } from 'react';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div id='chat-layout-main' className='h-full flex flex-col'>
      <div id='chat-layout-title' className='p-3'></div>
      <div
        id='chat-layout-message'
        className='bg-white h-full flex flex-col h-screen overflow-y-auto border-l border-gray-200 shadow-lg gap-3 p-4'
      >
        {children}
      </div>
    </div>
  );
}
