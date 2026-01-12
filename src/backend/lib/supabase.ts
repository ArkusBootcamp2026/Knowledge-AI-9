import { createClient } from '@supabase/supabase-js';

// Estas variables deben estar en un archivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || '';

// Validar que las credenciales estén presentes
const hasValidCredentials = !!(supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  supabaseAnonKey !== 'placeholder-key');

if (!hasValidCredentials) {
  // Intentar detectar la ruta del proyecto para el mensaje de error
  let envFilePath = '.env (en la raíz del proyecto, mismo nivel que package.json)';
  
  try {
    // En Node.js podemos obtener la ruta real
    if (typeof process !== 'undefined' && typeof process.cwd === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const path = require('path');
      const projectRoot = process.cwd();
      envFilePath = path.join(projectRoot, '.env');
    }
  } catch (e) {
    // Si falla (por ejemplo, en el navegador o módulos no disponibles), usar valor por defecto
  }
  
  const errorMessage = `
⚠️ Supabase credentials not found!

📁 Ubicación del archivo .env:
   ${envFilePath}

📝 Contenido del archivo .env:
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui

⚠️ IMPORTANTE:
   1. Crea el archivo .env en la raíz del proyecto (donde está package.json)
   2. Agrega las variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
   3. Reinicia el servidor: npm run dev
   (Vite solo lee .env al iniciar)

Estado actual:
   VITE_SUPABASE_URL: ${supabaseUrl ? '✓ Configurada' : '✗ No configurada'}
   VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✓ Configurada' : '✗ No configurada'}

Debug:
   - Claves VITE_ encontradas: ${Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')).join(', ') || 'Ninguna'}
   - VITE_SUPABASE_URL: ${supabaseUrl || '(vacío)'}
   - VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '***' + supabaseAnonKey.slice(-4) : '(vacío)'}
  `;
  console.error(errorMessage);
}

// Crear el cliente de Supabase
// Si las credenciales están vacías, se usan placeholders para evitar el error de inicialización
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Exportar función para verificar configuración
export const isSupabaseConfigured = hasValidCredentials;

