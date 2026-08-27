import {
  Mic, Send, SmartToy, Close, DeleteOutline, StopCircle,
  MarkUnreadChatAlt
} from "@mui/icons-material";
import {
  Fab, TextField, IconButton, Box, Typography, Avatar,
  Tooltip, Zoom, Fade, Badge, Paper
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import vozService from "../services/voz.service";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Mensaje {
  remitente: "usuario" | "ia";
  texto: string;
  hora: string;
  esError?: boolean;
}

interface Props {
  recargarCitas?: () => void;
}

const hora = () => new Date().toLocaleTimeString("es-CO", {
  hour: "2-digit", minute: "2-digit"
});

const bienvenida = (): Mensaje => ({
  remitente: "ia",
  texto: "¡Hola! Soy tu asistente de citas. Puedes escribirme o dictar por voz lo que necesitas agendar.",
  hora: hora()
});

export default function VozButton({ recargarCitas }: Props) {
  const [open, setOpen] = useState(false);
  const [texto, setTexto] = useState("");
  const [mensajes, setMensajes] = useState<Mensaje[]>([bienvenida()]);
  const [cargando, setCargando] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const [voz, setVoz] = useState(true);

  const scroll = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const recognition = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setVoz(!!(window.SpeechRecognition || window.webkitSpeechRecognition));
  }, []);

  useEffect(() => {
    scroll.current?.scrollTo({
      top: scroll.current.scrollHeight,
      behavior: "smooth"
    });
  }, [mensajes, cargando]);

  useEffect(() => {
    if (open) setTimeout(() => input.current?.focus(), 200);
  }, [open]);

  const enviar = async (valor: string) => {
    const mensaje = valor.trim();
    if (!mensaje || cargando) return;

    setMensajes(p => [...p, {
      remitente: "usuario", texto: mensaje, hora: hora()
    }]);
    setTexto("");
    setCargando(true);

    try {
      const respuesta = await vozService.agendar(mensaje);
      const resultado = typeof respuesta === "string"
        ? respuesta
        : respuesta?.mensaje || "Cita procesada correctamente.";

      recargarCitas?.();
      setMensajes(p => [...p, {
        remitente: "ia", texto: resultado, hora: hora()
      }]);
      navigate("/citas");
    } catch (e: any) {
      setMensajes(p => [...p, {
        remitente: "ia",
        texto: e?.response?.data?.mensaje || e?.message ||
          "No fue posible procesar tu solicitud.",
        hora: hora(),
        esError: true
      }]);
    } finally {
      setCargando(false);
    }
  };

  const escuchar = () => {
    if (escuchando) {
      recognition.current?.stop();
      setEscuchando(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoz(false);
      return;
    }

    const r = new SpeechRecognition();
    r.lang = "es-CO";
    r.interimResults = false;
    r.maxAlternatives = 1;
    recognition.current = r;
    setEscuchando(true);
    r.start();

    r.onresult = (e: any) => {
      setEscuchando(false);
      enviar(e.results[0][0].transcript);
    };

    r.onerror = () => {
      setEscuchando(false);
      setMensajes(p => [...p, {
        remitente: "ia",
        texto: "No logré escucharte bien. Intenta nuevamente.",
        hora: hora(),
        esError: true
      }]);
    };

    r.onend = () => setEscuchando(false);
  };

  const limpiar = () => {
    setMensajes([bienvenida()]);
    setTexto("");
  };

  return (
    <>
      <Zoom in={!open}>
        <Fab
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed", bottom: 28, right: 28,
            width: 64, height: 64,
            background: "linear-gradient(135deg,#1976d2,#1e88e5)",
            boxShadow: "0 8px 24px #1976d2",
            "&:hover": {
              background: "linear-gradient(135deg,#1e88e5,#1976d2)",
              transform: "scale(1.08)"
            }
          }}
        >
          <Badge color="error" variant="dot" invisible={mensajes.length <= 1}>
            <MarkUnreadChatAlt sx={{ color: "white" }} />
          </Badge>
        </Fab>
      </Zoom>

      <Fade in={open} unmountOnExit>
        <Paper sx={{
          position: "fixed", bottom: 24, right: 24, zIndex: 1301,
          width: 380, maxWidth: "calc(100vw - 32px)",
          height: 560, maxHeight: "calc(100vh - 48px)",
          borderRadius: "20px", display: "flex",
          flexDirection: "column", overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,.25)"
        }}>
          <Box sx={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", px: 2, py: 1.5,
            background: "linear-gradient(135deg,#1976d2,#1e88e5)",
            color: "#fff"
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar sx={{ bgcolor: "rgba(255,255,255,.2)" }}>
                <SmartToy fontSize="small" />
              </Avatar>
              <Box>
                <Typography fontWeight={600}>Asistente de Citas</Typography>
                <Typography variant="caption">
                  ● {cargando ? "Escribiendo..." : "En línea"}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Tooltip title="Nueva conversación">
                <IconButton onClick={limpiar} sx={{ color: "white" }}>
                  <DeleteOutline />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cerrar">
                <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
                  <Close />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box ref={scroll} sx={{
            flex: 1, overflowY: "auto", p: 2,
            bgcolor: "#F4F5FA", display: "flex",
            flexDirection: "column", gap: 1.25
          }}>
            {mensajes.map((m, i) => {
              const user = m.remitente === "usuario";
              return (
                <Fade in key={i}>
                  <Box sx={{
                    display: "flex",
                    flexDirection: user ? "row-reverse" : "row",
                    alignItems: "flex-end", gap: .75
                  }}>
                    {!user && (
                      <Avatar sx={{
                        width: 26, height: 26,
                        bgcolor: m.esError ? "#ffe3e3" : "#EDE9FE",
                        color: m.esError ? "#e03131" : "#1e88e5"
                      }}>
                        <SmartToy sx={{ fontSize: 15 }} />
                      </Avatar>
                    )}

                    <Box sx={{ maxWidth: "76%" }}>
                      <Box sx={{
                        px: 1.75, py: 1.1, fontSize: 14,
                        lineHeight: 1.5, whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        color: user ? "black" : m.esError ? "#c92a2a" : "#1f2233",
                        bgcolor: user ? "white" : m.esError ? "#fff0f0" : "#fff",
                        border: !user && !m.esError ? "1px solid #ECEBF7" : "none",
                        borderRadius: user
                          ? "14px 14px 4px 14px"
                          : "14px 14px 14px 4px",
                        boxShadow: user
                          ? "0 2px 8px rgba(76,52,212,.25)"
                          : "0 1px 4px rgba(0,0,0,.05)"
                      }}>
                        {m.texto}
                      </Box>
                      <Typography variant="caption" sx={{
                        color: "#9a9cae", display: "block",
                        textAlign: user ? "right" : "left", mt: .4
                      }}>
                        {m.hora}
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              );
            })}

            {cargando && (
              <Box sx={{ display: "flex", gap: .75 }}>
                <Avatar sx={{
                  width: 26, height: 26,
                  bgcolor: "#EDE9FE", color: "#1e88e5"
                }}>
                  <SmartToy sx={{ fontSize: 15 }} />
                </Avatar>
                <Box sx={{
                  bgcolor: "#fff", px: 2, py: 1.3,
                  borderRadius: "14px 14px 14px 4px"
                }}>
                  •••
                </Box>
              </Box>
            )}
          </Box>

          <Box sx={{
            p: 1.25, bgcolor: "#fff",
            borderTop: "1px solid #EFEFF5"
          }}>
            {escuchando && (
              <Typography variant="caption" sx={{
                display: "block", px: 1, pb: .75, color: "#e03131"
              }}>
                🔴 Escuchando... habla ahora
              </Typography>
            )}

            {!voz && (
              <Typography variant="caption" sx={{
                display: "block", px: 1, pb: .75, color: "#c92a2a"
              }}>
                Tu navegador no soporta dictado por voz.
              </Typography>
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: .75 }}>
              <TextField
                inputRef={input}
                fullWidth
                size="small"
                multiline
                maxRows={4}
                disabled={cargando}
                placeholder="Escribe tu mensaje..."
                value={texto}
                onChange={e => e.target.value.length <= 300 &&
                  setTexto(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    enviar(texto);
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    bgcolor: "#F4F5FA",
                    fontSize: 14,
                    "& fieldset": { border: "1px solid transparent" },
                    "&:hover fieldset": { border: "1px solid #DCD8F7" },
                    "&.Mui-focused fieldset": {
                      border: "1.5px solid #1976d2"
                    }
                  }
                }}
              />

              <Tooltip title={escuchando ? "Detener" : "Dictar por voz"}>
                <span>
                  <IconButton
                    onClick={escuchar}
                    disabled={cargando || !voz}
                    sx={{
                      bgcolor: escuchando ? "#fff0f0" : "#F4F5FA",
                      color: escuchando ? "#e03131" : "#1976d2"
                    }}
                  >
                    {escuchando
                      ? <StopCircle fontSize="small" />
                      : <Mic fontSize="small" />}
                  </IconButton>
                </span>
              </Tooltip>

              <IconButton
                onClick={() => enviar(texto)}
                disabled={cargando || !texto.trim()}
                sx={{
                  bgcolor: texto.trim() ? "#1976d2" : "#F4F5FA",
                  color: texto.trim() ? "#fff" : "#c3c3cf",
                  "&:hover": { bgcolor: "#4834D4" }
                }}
              >
                <Send fontSize="small" />
              </IconButton>
            </Box>

            <Typography variant="caption" sx={{
              display: "block", textAlign: "right",
              color: "#9a9cae", mt: .5
            }}>
              {texto.length}/300
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </>
  );
}