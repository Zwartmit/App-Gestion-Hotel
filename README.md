# Solución de la Prueba - Vacante (22028) Desarrollador Frontend

## Tecnologías Utilizadas

### Frontend:
- React
- TypeScript
- Tailwind CSS
- Vite

### Gestión de Estado:
- localStorage para persistencia de datos.

### Notificaciones:
- EmailJS para enviar correos de confirmación.

### Herramientas de Desarrollo:
- JSON Server para mocks de servicios web para la interacción con datos.

## Patrones de Diseño Usados

### 1. Singleton (Almacenamiento en localStorage)
**Descripción:** Se utilizó el patrón Singleton para gestionar el acceso a localStorage a través de funciones utilitarias (`storage.ts`). Esto asegura que solo haya una instancia de acceso a los datos almacenados en el navegador.

**Implementación:** Las funciones como `getHotels`, `saveHotel`, `getRooms`, etc., actúan como una única fuente de verdad para interactuar con `localStorage`.

### 2. Observer (Actualización de la UI)
**Descripción:** Se implementó un patrón Observer para notificar a los componentes cuando los datos en `localStorage` cambian. Por ejemplo, cuando se agrega o modifica un hotel, se dispara un evento personalizado (`hotelListUpdated`) para actualizar la lista de hoteles en la UI.

**Implementación:** Uso de `window.dispatchEvent` y `window.addEventListener` para notificar y escuchar cambios.

### 3. Factory (Creación de Reservas)
**Descripción:** Se utilizó un enfoque similar al patrón Factory para crear reservas. La función `saveReservation` actúa como una fábrica que construye y guarda objetos de reserva en `localStorage`.

**Implementación:** La función `saveReservation` toma los datos del formulario y crea un objeto de reserva con una estructura consistente.

### 4. Strategy (Validación de Datos)
**Descripción:** Se aplicó el patrón Strategy para validar los datos del formulario de reserva. Diferentes estrategias de validación (como validación de correo electrónico, campos obligatorios, etc.) se implementaron en una sola función (`handleSubmit`).

**Implementación:** Uso de funciones de validación específicas dentro del formulario de reserva.

### 5. Decorator (Envío de Correos con EmailJS)
**Descripción:** El envío de correos electrónicos con EmailJS se puede considerar una implementación del patrón Decorator, donde se "decora" la funcionalidad de reserva con la notificación por correo.

**Implementación:** Después de guardar una reserva, se envía un correo de confirmación utilizando EmailJS.

## Instalación y Uso

### 1. Clonar el repositorio:
```sh
git clone https://github.com/Zwartmit/App-Hotelera.git
```

### 2. Instalar las dependencias:
```sh
npm install
```

### 3. Iniciar el servidor de desarrollo:
```sh
npm run dev
```

### 4. Acceder a la aplicación en:
[http://localhost:5173/](http://localhost:5173/)

### 5. Mock de servicios web:
Para simular los mocks de servicios web para la interacción con datos se usa JSON Server.

#### - Instalar JSON Server:
```sh
npm install json-server --save-dev
```

#### - Iniciar el servidor:
```sh
npm run mock-server
```

#### - Acceder al mock en:
[http://localhost:3001/](http://localhost:3001/)

### 6. Login
#### - Como administrador:
**Usuario:** admin  
**Contraseña:** admin123

#### - Como usuario:
**Usuario:** user  
**Contraseña:** user123

## Proyecto Desplegado
Se puede acceder al proyecto desde el siguiente enlace:
[https://gestion-hotelera.netlify.app](https://gestion-hotelera.netlify.app)

