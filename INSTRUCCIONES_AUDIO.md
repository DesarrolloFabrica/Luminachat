# 📢 Configuración de Audio del Asistente Virtual

## 🎯 Resumen
El sistema de audio está completamente estructurado y listo para usar. Solo necesitas agregar tus archivos de audio y actualizar las rutas si es necesario.

## 📁 Ubicación de Archivos de Audio

Los archivos de audio deben ubicarse en la carpeta `/public/audio/`:

```
/public
  └── /audio
      ├── welcome.mp3         (Audio de bienvenida)
      └── response.mp3        (Audio de respuestas predeterminadas)
```

## ⚙️ Configuración Fácil

### Paso 1: Agregar tus archivos de audio
Coloca tus archivos de audio en la carpeta `/public/audio/` con los nombres:
- `welcome.mp3` - Se reproduce cuando el chatbot muestra el mensaje de bienvenida
- `response.mp3` - Se reproduce para respuestas predeterminadas (cuando la gema no tiene respuesta)

### Paso 2: (Opcional) Cambiar las rutas de audio
Si prefieres usar nombres diferentes o ubicaciones distintas, edita el archivo `/src/app/components/ReactiveAvatar.tsx`:

```typescript
// ===========================
// CONFIGURACIÓN DE AUDIO
// ===========================
// Cambia estas URLs por los archivos de audio que desees usar
const AUDIO_CONFIG = {
  welcome: "/audio/welcome.mp3",           // ⬅️ Cambia esta ruta
  defaultResponse: "/audio/response.mp3"   // ⬅️ Cambia esta ruta
};
```

## 🎵 Formatos de Audio Soportados

Los navegadores modernos soportan los siguientes formatos:
- ✅ MP3 (Recomendado - mejor compatibilidad)
- ✅ WAV
- ✅ OGG
- ✅ M4A/AAC

## 🔧 Cómo Funciona

### Audio de Bienvenida
Se reproduce automáticamente cuando:
1. El usuario hace clic en "Hablar con Asistente"
2. El chat se abre por primera vez
3. Se muestra el mensaje de bienvenida

### Audio de Respuesta Predeterminada
Se reproduce cuando:
1. El chatbot envía una respuesta
2. La respuesta no proviene de la gema conectada (es una respuesta predeterminada)

## 💡 Ejemplo Práctico

Cuando enlaces tu gema al chatbot:

```typescript
// En ChatInterface.tsx, línea ~85
if (onAudioTrigger) {
  onAudioTrigger('defaultResponse');  // Reproduce audio cuando la gema NO tiene respuesta
}
```

Para respuestas de la gema sin audio, simplemente no llames a `onAudioTrigger` en esos casos.

## 🎨 Mejoras Visuales Aplicadas

✅ **Reducción de saturación del avatar:**
- `brightness`: 1.4 → 1.15
- `contrast`: 1.2 → 1.05
- `opacity` del glow: 0.8 → 0.6
- Shadow intensity reducida en 20%

✅ **Forma del avatar:**
- Mantiene la forma de óvalo circular preferida
- Border radius completo (`rounded-full`)

## 🚀 Probando el Sistema

1. Coloca cualquier archivo de audio de prueba en `/public/audio/` como `welcome.mp3`
2. Abre la aplicación
3. Selecciona cualquier escuela
4. Haz clic en "Hablar con Asistente"
5. El audio de bienvenida debería reproducirse automáticamente
6. Envía un mensaje, y la respuesta predeterminada debería reproducir `response.mp3`

## ⚠️ Notas Importantes

- Los navegadores pueden bloquear la reproducción automática de audio. Si esto sucede, el sistema manejará el error de forma silenciosa (mensaje en consola).
- El audio se detiene automáticamente cuando se cambia entre escuelas o se cierra el chat.
- Solo se puede reproducir un audio a la vez; si se activa uno nuevo, el anterior se detiene.

## 🔄 Integración con Gema

Cuando conectes tu gema, puedes controlar cuándo reproducir audio:

```typescript
// Ejemplo: Solo reproducir audio para respuestas de fallback
if (responseFromGema) {
  // No reproducir audio - respuesta de la gema
  setAudioTrigger(null);
} else {
  // Reproducir audio - respuesta predeterminada
  setAudioTrigger('defaultResponse');
}
```

---

¿Necesitas ayuda adicional? Todos los cambios están solo en el componente `ReactiveAvatar.tsx` para facilitar futuras modificaciones.
