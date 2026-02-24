"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";

export function DiscussionsTab({ classSectionId, subjectId }: { classSectionId: string, subjectId: string }) {
  const [message, setMessage] = useState("");
  
  // A mock list of messages
  const messages = [
     { id: 1, sender: "You", role: "teacher", content: "Welcome to the class discussion board! Feel free to ask questions about the current chapter here.", time: "10:00 AM" },
     { id: 2, sender: "John Doe", role: "student", content: "Could you re-explain the concept of fractions we learned yesterday?", time: "10:30 AM" },
     { id: 3, sender: "Jane Smith", role: "student", content: "I was wondering if we will have a pop quiz on this topic soon.", time: "11:15 AM" },
  ];

  return (
    <div className="flex flex-col h-[600px] border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold text-slate-900">Class Discussion Room</h2>
          <p className="text-xs text-slate-500">Chat with students in this class section</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/50">
         {messages.map((msg) => (
           <div key={msg.id} className={`flex gap-3 ${msg.role === 'teacher' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium ${msg.role === 'teacher' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                {msg.sender.charAt(0)}
              </div>
              <div className={`flex flex-col ${msg.role === 'teacher' ? 'items-end' : 'items-start'}`}>
                 <div className="flex items-baseline gap-2 mb-1">
                   <span className="text-sm font-medium text-slate-900">{msg.sender}</span>
                   <span className="text-xs text-slate-500">{msg.time}</span>
                 </div>
                 <div className={`rounded-2xl px-4 py-2 text-sm ${msg.role === 'teacher' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'}`}>
                    {msg.content}
                 </div>
              </div>
           </div>
         ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 bg-white p-4">
         <div className="flex items-center gap-2">
           <input 
             type="text" 
             value={message}
             onChange={(e) => setMessage(e.target.value)}
             placeholder="Type your message to the class..." 
             className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500"
             onKeyDown={(e) => {
                if (e.key === 'Enter' && message.trim()) {
                   setMessage("");
                }
             }}
           />
           <Button className="h-11 w-11 shrink-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 p-0" variant="default">
             <Send className="h-5 w-5" />
           </Button>
         </div>
         <p className="mt-2 text-xs text-slate-400 text-center">Messages are visible to all students in this class section.</p>
      </div>
    </div>
  );
}
