
export interface IUser {
    name: string; // Nombre del usuario (obligatorio)
    lastName?: string; // Apellido (opcional)
    nie?: string; // NIE (opcional)
    stepper?: any[]; // Array de pasos (opcional, con valor por defecto como [])
    email: string; // Email en minúsculas, obligatorio y único
    password?: string; // Contraseña, obligatoria pero no seleccionada por defecto
    role: 'customer' | 'admin' | 'manager' | 'user' | 'seller' | 'provider'; // Rol del usuario
    verification?: string; // Código de verificación (opcional)
    verified?: boolean; // Indica si el usuario está verificado (valor por defecto: false)
    tag?: any[]; // Etiquetas asociadas (opcional, con valor por defecto como [])
    avatar?: string; // Avatar del usuario (opcional)
    description?: string; // Descripción (opcional)
    nameBusiness?: string; // Nombre de la empresa (opcional)
    phone?: string; // Teléfono (opcional)
    address?: Record<string, any>; // Dirección (opcional, definida como un objeto genérico)
    loginAttempts?: number; // Intentos de inicio de sesión (valor por defecto: 0, no seleccionado)
    blockExpires?: Date; // Fecha de expiración del bloqueo (opcional, no seleccionada)
    socialNetwork?: any[]; // Redes sociales asociadas (opcional)
    referredCode: string; // Código de referencia único, obligatorio
    dummy?: boolean; // Indica si es un usuario dummy (valor por defecto: false)
    createdAt?: Date; // Fecha de creación (generada automáticamente)
    updatedAt?: Date; // Fecha de actualización (generada automáticamente)
    tenantId: string; //
  }
  
  // Métodos del modelo
  export interface IUserMethods {
    comparePassword(passwordAttempt: string): Promise<boolean>; // Compara la contraseña proporcionada con la almacenada
  }
