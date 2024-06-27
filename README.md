# Proyecto de Comparación de Frameworks Backend
## Descripción
Este proyecto tiene como objetivo comparar distintos frameworks backend basándose en diversas métricas. Utiliza Django y Django REST Framework para el backend y React para el frontend. La aplicación permite a los usuarios crear proyectos, definir frameworks, asignar métricas a estos frameworks y generar reportes que comparan los frameworks en función de las métricas definidas.

## Tecnologías Utilizadas
- Backend: Django, Django REST Framework
- Frontend: React, Material-UI
- Autenticación: JWT (JSON Web Tokens)
- API Client: Axios

## Instalación y Configuración
Requisitos
- Python 3.x
- Node.js y npm (Node Package Manager)
- Virtualenv (opcional pero recomendado)

## Configuración del Backend
1. Clona el repositorio:
  
```bash
  git clone https://github.com/juanpdiaz15/react-django-project-backchoice-
  cd backend
```

2. Crea y activa un entorno virtual:

```bash
virtualenv env
source env/bin/activate  # En Windows usa `env\Scripts\activate`

```
3. Instala las dependencias
```bash
pip install -r requirements.txt
```

4. Realiza las migraciones y crea un superusuario
```bash
python manage.py migrate
python manage.py createsuperuser

```

5. Inicia el servidor de desarrollo:
```bash
python manage.py runserver
```
## Configuración del Frontend
1. Navega al directorio del frontend:
```bash
cd frontend
```
2. Instala las dependencias del frontend:
```bash
npm install
```
3. Inicia el servidor de desarrollo del frontend:
```bash
npm run dev
```


## License

[MIT](https://choosealicense.com/licenses/mit/)

