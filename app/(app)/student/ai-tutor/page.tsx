"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Bot, Send, User, ArrowLeft, Sparkles } from "lucide-react";

export default function StudentAITutorPage() {
  const [query, setQuery] = useState("");
  const [subjects, setSubjects] = useState<any[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState("");
  const [explanationMode, setExplanationMode] = useState("Standard");
  const [isLoading, setIsLoading] = useState(false);

  const [isChatActive, setIsChatActive] = useState(false);
  const [messages, setMessages] = useState<{ role: "tutor" | "student"; content: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/subjects")
      .then(res => res.json())
      .then(data => {
        if (data.subjects) setSubjects(data.subjects);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedSubjectId) {
      setChapters([]);
      setSelectedChapterId("");
      return;
    }
    fetch(`/api/chapters?subjectId=${selectedSubjectId}`)
      .then(res => res.json())
      .then(data => {
        if (data.chapters) setChapters(data.chapters);
      })
      .catch(console.error);
  }, [selectedSubjectId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleStartSession = () => {
    const subject = subjects.find(s => s.id === selectedSubjectId);
    const chapter = chapters.find(c => c.id === selectedChapterId);
    
    setMessages([
      { 
        role: "tutor", 
        content: `Hi! I'm your AI Tutor. Feel free to ask any question from **${chapter?.title || selectedChapterId}** in **${subject?.name || selectedSubjectId}**.` 
      }
    ]);
    setIsChatActive(true);
  };

  const handleAsk = () => {
    if (!query.trim()) return;
    
    const userMessage = query.trim();
    setMessages(prev => [...prev, { role: "student", content: userMessage }]);
    setQuery("");
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let modePrefix = "";
      if (explanationMode === "Simple") {
        modePrefix = "Here's a simple explanation: ";
      } else if (explanationMode === "Step-by-Step") {
        modePrefix = "Let's break this down step-by-step:\n1. ";
      } else if (explanationMode === "Quiz Me") {
        modePrefix = "Before I answer, let me ask you a quick question to test your understanding: ";
      }

      setMessages(prev => [
        ...prev, 
        { 
          role: "tutor", 
          content: `(Mock RAG Response - ${explanationMode} Mode)\n${modePrefix}Here is the explanation for "${userMessage}" based on the selected chapter material. Remember that positive and negative integers...` 
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  if (!isChatActive) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto pt-8">
        <div className="text-center space-y-2 mb-8">
          <div className="mx-auto bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Bot className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">AI Personal Tutor</h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Get instant help with your studies. Choose a subject and chapter to focus the AI's knowledge on exactly what you need.
          </p>
        </div>

        <Card className="shadow-lg border-indigo-100/60 overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <CardContent className="p-8">
            <div className="space-y-7">
              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">1. Select Subject</Label>
                <Select value={selectedSubjectId} onValueChange={(v) => { setSelectedSubjectId(v); }}>
                  <SelectTrigger className="bg-slate-50/50 h-12 text-base border-slate-200 focus:ring-indigo-500">
                    <SelectValue placeholder="Choose a subject..." />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(s => (
                       <SelectItem key={s.id} value={s.id}>{s.name || s.id}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">2. Select Chapter</Label>
                <Select value={selectedChapterId} onValueChange={setSelectedChapterId} disabled={!selectedSubjectId || chapters.length === 0}>
                  <SelectTrigger className="bg-slate-50/50 h-12 text-base border-slate-200 focus:ring-indigo-500">
                    <SelectValue placeholder={!selectedSubjectId ? "Select a subject first" : "Choose a chapter..."} />
                  </SelectTrigger>
                  <SelectContent>
                    {chapters.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={handleStartSession} 
                  disabled={!selectedSubjectId || !selectedChapterId} 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-lg font-medium shadow-md transition-all hover:shadow-lg disabled:opacity-50 disabled:shadow-none"
                >
                  <Sparkles className="mr-2 h-5 w-5" /> Start Tutor Session
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setIsChatActive(false)} className="rounded-full hover:bg-slate-100">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-xl">
              <Bot className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">AI Tutor</h1>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {subjects.find(s => s.id === selectedSubjectId)?.name} • {chapters.find(c => c.id === selectedChapterId)?.title}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Card className="flex-1 flex flex-col shadow-md overflow-hidden border-slate-200 bg-white">
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50/50 scroll-smooth">
          <div className="space-y-6 max-w-3xl mx-auto pb-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-4 ${m.role === "student" ? "flex-row-reverse" : ""}`}>
                <div className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center shadow-sm ${m.role === "tutor" ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-600"}`}>
                  {m.role === "tutor" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm text-sm whitespace-pre-wrap leading-relaxed ${m.role === "student" ? "bg-indigo-600 text-white rounded-tr-sm" : "bg-white border border-slate-100 text-slate-800 rounded-tl-sm"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center gap-2">
                  <span className="flex gap-1.5 opacity-70">
                    <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full animate-bounce"></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-4px_10px_-5px_rgba(0,0,0,0.05)] z-10">
          <div className="max-w-3xl mx-auto flex gap-2 sm:gap-3 items-center bg-slate-50 p-1.5 rounded-full border border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400/20 transition-all shadow-inner">
            <div className="pl-1 sm:pl-2 shrink-0">
              <Select value={explanationMode} onValueChange={setExplanationMode}>
                <SelectTrigger className="w-[120px] sm:w-[140px] h-9 border-0 bg-white shadow-sm rounded-full text-xs font-medium text-slate-700 focus:ring-0 focus:ring-offset-0 pr-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard" className="text-xs">Standard</SelectItem>
                  <SelectItem value="Simple" className="text-xs">Simple</SelectItem>
                  <SelectItem value="Step-by-Step" className="text-xs">Step-by-Step</SelectItem>
                  <SelectItem value="Quiz Me" className="text-xs">Quiz Me</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder="Ask a question about this chapter..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
              className="border-0 bg-transparent flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 text-base shadow-none"
              disabled={isLoading}
            />
            <Button 
              size="icon"
              onClick={handleAsk} 
              disabled={isLoading || !query.trim()} 
              className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shrink-0 h-10 w-10 flex items-center justify-center shadow-sm transition-transform active:scale-95 disabled:active:scale-100"
            >
              <Send className="h-4 w-4 ml-0.5" />
            </Button>
          </div>
          <div className="text-center mt-3">
            <p className="text-[10px] text-slate-400 font-medium">AI can make mistakes. Verify important information with your class notes.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
