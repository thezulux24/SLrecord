# Sistema de Control de Natación - Récord por Santa Librada

## 🎯 Características

Este sistema cuenta con dos vistas principales:

### 👁️ Vista Pública
- Muestra el tiempo transcurrido en tiempo real
- Barra de progreso animada con nadador
- Estadísticas en vivo (calorías, frecuencia cardíaca, brazadas, etc.)
- Diseño responsive para pantallas grandes

### ⚙️ Panel de Administrador
- Control manual del temporizador (Iniciar/Pausar/Reiniciar)
- Ajuste manual del tiempo transcurrido
- Edición en tiempo real de todas las estadísticas
- Sincronización automática con la vista pública

## 🚀 Cómo usar

### Para iniciar la aplicación:
```bash
npm run dev
```

### Acceder a las vistas:

1. **Vista Pública**: 
   - URL: `http://localhost:5174/`
   - Esta es la vista que se mostrará al público en pantallas grandes

2. **Panel de Administrador**:
   - URL: `http://localhost:5174/admin`
   - O haz clic en el botón "⚙️ Panel Admin" en la esquina superior derecha

### Flujo de trabajo recomendado:

1. **Configuración inicial**:
   - Abre el Panel de Administrador en tu computadora
   - Ajusta el tiempo inicial si es necesario

2. **Durante el evento**:
   - En el Panel Admin: Presiona "Iniciar" para comenzar el conteo
   - Actualiza las estadísticas manualmente según los datos reales del nadador
   - Presiona "Guardar Estadísticas" después de cada actualización

3. **Pantalla pública**:
   - Abre la Vista Pública en otra ventana/pantalla
   - Esta se actualizará automáticamente cada segundo con los datos del admin
   - Ideal para proyectar en pantallas grandes durante el evento

## 📊 Estadísticas disponibles

- **Calorías**: Total de calorías quemadas (kcal)
- **FC Máxima**: Frecuencia cardíaca máxima registrada (bpm)
- **FC Media**: Frecuencia cardíaca promedio (bpm)
- **Brazadas**: Número total de brazadas
- **Velocidad Media**: Velocidad promedio por brazada (m/s)
- **Distancia**: Distancia total recorrida (km)

## 💾 Persistencia de datos

Los datos se guardan automáticamente en `localStorage` del navegador, por lo que:
- ✅ Los datos persisten entre recargas de página
- ✅ Múltiples ventanas/pestañas se sincronizan automáticamente
- ⚠️ Los datos se pierden si se limpia el caché del navegador

## 🎨 Características visuales

- Barra de progreso animada con efectos de agua
- Nadador animado que se mueve con el progreso
- Diseño dark mode profesional
- Totalmente responsive
- Animaciones suaves y fluidas

## 🔧 Controles del Panel Admin

### Control de Tiempo
- **Iniciar/Pausar**: Controla el temporizador
- **Reiniciar**: Vuelve todo a cero
- **Ajuste Manual**: Modifica horas, minutos y segundos manualmente

### Estadísticas
- Todos los campos son editables
- Los cambios se reflejan inmediatamente en la vista pública
- Presiona "Guardar" para asegurar que los datos se persistan

## 📱 Uso en múltiples dispositivos

Para mostrar en múltiples pantallas:

1. Asegúrate de que todos los dispositivos estén en la misma red
2. En el Panel Admin, verás la URL para compartir
3. Abre esa URL en los dispositivos donde quieres mostrar la vista pública
4. Todos se sincronizarán automáticamente

## ⚡ Shortcuts

- El botón en la esquina superior derecha alterna entre vistas
- Presiona F11 para modo pantalla completa (recomendado para la vista pública)
