import { useState, useRef, useEffect } from "react";
import { Send, User, Loader2, ArrowLeft, Settings, Save, Home, ChevronLeft } from "lucide-react";
import { LuminaCoreIcon } from "./visual/LuminaCoreIcon";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";
import { getStoredApiKey, setStoredApiKey } from "../../lib/api-config";
import type { SectionKey } from "../../lib/pdfMap";
import { PDF_PATH_BY_SECTION } from "../../lib/pdfMap";
import { answerUserQuestion } from "../../lib/answerUserQuestion";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  buttons?: ButtonOption[];
  questionBox?: QuestionBoxData;
}

interface ButtonOption {
  id: string;
  label: string;
  action: () => void;
}

interface QuestionBoxData {
  subtopic: string;
  onSend: (question: string) => void;
  onBack: () => void;
  onHome: () => void;
}

interface ChatInterfaceProps {
  accentColor: string;
  schoolName: string;
  onBotResponse: () => void;
  onBotTyping: (isTyping: boolean) => void;
  onBack?: () => void;
  onAudioTrigger?: (audioType: 'welcome' | 'defaultResponse' | null) => void;
}

// Datos del árbol de decisiones
const DECISION_TREE = {
  "Normatividad Académica": {
    subtopics: [
      "Calendario Académico",
      "Evaluaciones y Notas",
      "Matrículas y Pagos",
      "Homologaciones y Reingresos"
    ]
  },
  "Normatividad Institucional": {
    subtopics: [
      "Política de Datos y Privacidad",
      "Manual de Convivencia / Conducta",
      "Canales de Atención y PQRS",
      "Estructura y Gobierno Institucional"
    ]
  },
  "Términos y Condiciones": {
    subtopics: [
      "Uso del Servicio y Alcance",
      "Responsabilidades del Usuario",
      "Propiedad Intelectual",
      "Modificaciones y Vigencia"
    ]
  },
  "Reglamento de Bienestar": {
    subtopics: [
      "Servicios de Bienestar",
      "Actividades y Programas",
      "Apoyos y Beneficios",
      "Rutas de Acompañamiento"
    ]
  }
};

export function ChatInterface({ accentColor, schoolName, onBotResponse, onBotTyping, onBack, onAudioTrigger }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [questionInput, setQuestionInput] = useState("");
  
  // Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedSection, setSelectedSection] = useState<SectionKey | null>(null);
  const hasInitialized = useRef(false);

  // Load API Key on mount
  useEffect(() => {
    setApiKey(getStoredApiKey());
  }, []);

  // Initialize with Level 1 on mount — guard evita doble ejecución en React StrictMode
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    if (onAudioTrigger) {
      onAudioTrigger('welcome');
    }
    showLevel1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveApiKey = () => {
    setStoredApiKey(apiKey);
    setShowSettings(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Add message helper
  const addMessage = (content: string, role: "user" | "bot", buttons?: ButtonOption[], questionBox?: QuestionBoxData) => {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random(),
      role,
      content,
      timestamp: new Date(),
      buttons,
      questionBox
    };
    setMessages((prev) => [...prev, newMessage]);
    if (role === "bot") {
      onBotResponse();
      if (onAudioTrigger) {
        onAudioTrigger('defaultResponse');
      }
    }
  };

  // Simulate typing delay
  const simulateTyping = (callback: () => void, delay = 1500) => {
    setIsTyping(true);
    onBotTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      onBotTyping(false);
      callback();
    }, delay);
  };

  // NIVEL 1: Mostrar temas principales
  const showLevel1 = () => {
    setCurrentTopic(null);
    const topics = Object.keys(DECISION_TREE);
    const buttons: ButtonOption[] = topics.map((topic) => ({
      id: topic,
      label: topic,
      action: () => handleTopicSelect(topic)
    }));

    simulateTyping(() => {
      addMessage("Elige un tema para comenzar:", "bot", buttons);
    }, 500);
  };

  // NIVEL 2: Mostrar subtemas del tema seleccionado
  const handleTopicSelect = (topic: string) => {
    console.log("TOPIC SELECTED:", topic); 
    setSelectedSection(topic as SectionKey);
     setCurrentTopic(topic);
    addMessage(`Seleccioné: ${topic}`, "user");
    
    const subtopics = DECISION_TREE[topic as keyof typeof DECISION_TREE].subtopics;
    const buttons: ButtonOption[] = subtopics.map((subtopic) => ({
      id: subtopic,
      label: subtopic,
      action: () => handleSubtopicSelect(subtopic)
    }));

    simulateTyping(() => {
      addMessage("Perfecto. Ahora elige un subtema:", "bot", buttons);
    });
  };

  // NIVEL 3: Mostrar caja de pregunta
  const handleSubtopicSelect = (subtopic: string) => {
    addMessage(`Seleccioné: ${subtopic}`, "user");
    
    const questionBox: QuestionBoxData = {
      subtopic,
      onSend: (question) => handleQuestionSend(question, subtopic, currentTopic),
      onBack: () => handleBackToSubtopics(),
      onHome: showLevel1
    };

    simulateTyping(() => {
      addMessage("", "bot", undefined, questionBox);
    });
  };
// Enviar pregunta desde el QuestionBox
const handleQuestionSend = async (question: string, subtopic: string, topic: string | null) => {
  console.log("QUESTION SEND selectedSection:", selectedSection);
  
  if (!question.trim()) return;

  // Botones (decláralos ANTES para poder usarlos en respuestas)
 const buttons: ButtonOption[] = [
    { id: "otro-subtema", label: "Elegir otro subtema", action: () => handleBackToSubtopics() },
    { id: "inicio", label: "Ir a Inicio", action: showLevel1 },
  ];

  addMessage(question, "user");
  setQuestionInput("");

  if (!topic) {
    addMessage(
      "Primero selecciona una sección (Normatividad institucional / Normatividad Académica / Términos y condiciones / Reglamento de bienestar).",
      "bot",
      buttons,
    );
    return;
  }

  onBotTyping?.(true);
  try {
    const reply = await answerUserQuestion(topic as SectionKey, question);
    addMessage(reply, "bot", buttons);
  } catch {
    addMessage("Ocurrió un error consultando el documento. Intenta de nuevo.", "bot", buttons);
  } finally {
    onBotTyping?.(false);
  }
};
 

  // Volver a los subtemas del tema actual
  const handleBackToSubtopics = () => {
    if (!currentTopic) return;
    
    const subtopics = DECISION_TREE[currentTopic as keyof typeof DECISION_TREE].subtopics;
    const buttons: ButtonOption[] = subtopics.map((subtopic) => ({
      id: subtopic,
      label: subtopic,
      action: () => handleSubtopicSelect(subtopic)
    }));

    simulateTyping(() => {
      addMessage("Perfecto. Ahora elige un subtema:", "bot", buttons);
    }, 800);
  };


  return (
    <div className="flex flex-col h-full w-full relative z-20 bg-white/50">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white/80 flex items-center justify-between backdrop-blur-md sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
              title="Volver"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          
          <div className="flex items-center gap-3">
            <LuminaCoreIcon accentColor={accentColor} size="md" active={isTyping} />
            <div>
              <h3 className="font-bold text-gray-900 text-sm tracking-wide">LUMINA</h3>
              <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                En línea
              </p>
            </div>
          </div>
        </div>

        {/* Settings Button */}
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className={clsx(
            "p-2 rounded-full hover:bg-gray-100 transition-colors",
            showSettings ? "text-gray-900 bg-gray-100" : "text-gray-400"
          )}
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Settings Modal / Overlay */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="absolute top-[72px] left-0 right-0 z-50 px-4"
          >
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xl backdrop-blur-xl">
               <h4 className="text-gray-900 font-bold mb-4 flex items-center gap-2">
                 <Settings size={16} /> Configuración de IA
               </h4>
               <div className="space-y-4">
                 <div>
                   <label className="text-xs text-gray-500 block mb-2">Google Gemini API Key</label>
                   <input 
                     type="password" 
                     value={apiKey}
                     onChange={(e) => setApiKey(e.target.value)}
                     placeholder="Ingresa tu API Key aquí..."
                     className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-900 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                   />
                   <p className="text-[10px] text-gray-400 mt-2">
                     La clave se guarda localmente en tu navegador para este demo.
                   </p>
                 </div>
                 <div className="flex justify-end gap-3">
                   <button 
                     onClick={() => setShowSettings(false)}
                     className="px-4 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 text-sm"
                   >
                     Cancelar
                   </button>
                   <button 
                     onClick={saveApiKey}
                     className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
                     style={{ backgroundColor: accentColor }}
                   >
                     <Save size={14} /> Guardar
                   </button>
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-gray-50/50">
        {messages.map((msg) => (
          <div key={msg.id}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={clsx(
                "flex items-end gap-3 max-w-[85%] lg:max-w-[75%]",
                msg.role === "user" ? "ml-auto flex-row-reverse" : ""
              )}
            >
              {msg.role === "bot" && (
                <LuminaCoreIcon accentColor={accentColor} size="sm" className="mb-1" />
              )}
              
              {msg.content && (
                <div 
                  className={clsx(
                    "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.role === "user" 
                      ? "bg-gray-900 text-white rounded-tr-sm shadow-md" 
                      : "bg-white text-gray-800 border border-gray-100 rounded-tl-sm shadow-sm"
                  )}
                >
                  {msg.content}
                  <div className={clsx("text-[10px] mt-2 font-medium", msg.role === "user" ? "text-white/60" : "text-gray-400")}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Render Buttons */}
            {msg.buttons && msg.buttons.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-3 ml-11 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-[85%] lg:max-w-[75%]"
              >
                {msg.buttons.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={btn.action}
                    className="px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 text-sm font-medium hover:border-gray-300 hover:shadow-md transition-all text-left hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      borderColor: `${accentColor}20`,
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Render Question Box */}
            {msg.questionBox && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                transition={{ delay: 0.2 }}
                className="mt-3 ml-11 max-w-[85%] lg:max-w-[75%]"
              >
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 shadow-lg">
                  <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Pregunta</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    ¿Qué necesitas saber sobre: <span className="font-semibold" style={{ color: accentColor }}>{msg.questionBox.subtopic}</span>?
                  </p>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={questionInput}
                      onChange={(e) => setQuestionInput(e.target.value)}
                      placeholder="Escribe tu pregunta…"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && questionInput.trim()) {
                          msg.questionBox?.onSend(questionInput);
                        }
                      }}
                    />
                    
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => msg.questionBox?.onSend(questionInput)}
                        disabled={!questionInput.trim()}
                        className="px-4 py-2 rounded-lg text-white text-sm font-semibold hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all shadow-sm"
                        style={{ backgroundColor: accentColor }}
                      >
                        Enviar pregunta
                      </button>
                      
                      <button
                        onClick={msg.questionBox?.onBack}
                        className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <ChevronLeft size={16} />
                        Volver
                      </button>
                      
                      <button
                        onClick={msg.questionBox?.onHome}
                        className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <Home size={16} />
                        Inicio
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}

        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end gap-3"
          >
            <LuminaCoreIcon accentColor={accentColor} size="sm" active className="mb-1" />
            <div className="bg-white p-4 rounded-2xl rounded-tl-sm flex gap-1 items-center h-12 border border-gray-100 shadow-sm">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Disabled in Decision Tree Mode */}
      <div className="p-4 border-t border-gray-200 bg-white backdrop-blur-md sticky bottom-0 z-30">
        <div className="flex gap-3 items-center justify-center">
          <div className="text-center text-sm text-gray-500">
            <p className="font-medium">Usa los botones de arriba para navegar</p>
            <button 
              onClick={showLevel1}
              className="mt-2 text-xs underline hover:text-gray-700 transition-colors flex items-center gap-1 mx-auto"
            >
              <Home size={12} />
              Reiniciar conversación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}