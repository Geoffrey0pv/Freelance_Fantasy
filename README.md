# Myrtile Web Application

The MYRTILLE project is a platform that connects clients with freelancers specialized in software development. It facilitates collaboration between both, allowing clients to find the right talent for their projects and freelancers to gain job opportunities in their area of expertise.

🚀 **¡Ya puedes probar la aplicación en producción!**  
👉 [FreelanceFantasy en Producción](https://freelancefantasy.netlify.app)


## **Development team**
  - Juan Camilo Tobar Morales - A00399905
  - Geoffry Esteban Pasaje Vidal - A00380495
  - Juan Jose Angarita Yela - A00380919
  - Jennifer Castro Cadena - A00400253
  - Joshua Rivera Gonzalez - A00399847



This project is a web application divided into three main parts:

1. **Frontend:** Built with React.
2. **Backend:** Implemented with Django.
3. **Database:** Utilizes PostgreSQL.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) and npm (for the React frontend)
- [Python 3.8+](https://www.python.org/) and pip (for the Django backend)
- [PostgreSQL](https://www.postgresql.org/) (for the database)
- [Git](https://git-scm.com/) (for version control)

## Commands to interact with the database.

  Before run the backend apply those command for load the information on database.
  
- python manage.py create_projects_with_factory
- python manage.py create_test_mileston
- python manage.py create_test_task
- python manage.py create_test_offers
- python manage.py create_test_notifications
- python manage.py create_test_reviews
- python manage.py images

## For selenium testing
  cd src/frontend/frontend/test/selenium/
  
- python test_register.py 
- python test_login.py 
- python test_payment.py 
- python test_notification.py

## For py test
  on backend only put this command
  python manage.py test


```markdown


## Project Setup

### Clone the Repository

```bash
git clone https://github.com/2024-2-PI1-G3/202402-proyecto-myrtille.git
cd 202402-proyecto-myrtille
```

### Backend Setup (Django)

1. **Create a virtual environment**

   ```bash
   ## Use this command only once when you install the project for the first time
   python -m venv venv

   # Run the Python environment
   On Windows: .\venv\Scripts\Activate

   # And then use this command to run server
   python manage.py runserver

   ```

2. **Install dependencies**

   ```bash
   ## Also use this command only once when you install the project & this command is to install libraries
   pip install -r requirements.txt
   ```

### Database Setup (PostgreSQL)

1. **Create a database**

   Install postgreSQL & configure the settings file with this information, remember when you're going to create the local database in your host,
   put the name database, the user & the password how Postgresql to have a standard in all repos, this is temporary still the application is still in the developing phase.

   ```plaintext
   DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.postgresql',
          'NAME': 'postgres',
          'USER': 'postgres',
          'PASSWORD': 'postgres',
          'HOST': 'localhost',  # O la IP del servidor de la base de datos
          'PORT': '5432',       # Puerto de PostgreSQL por defecto
      }
   }
   ```

5. **Apply migrations and run the server**

   ```bash
   ## This command is 
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup (React)

1. **Install Node.js**

   Make sure you have [Node.js](https://nodejs.org/) installed on your machine. Node.js comes with npm (Node Package Manager), which is required to install the project dependencies.

2. **Install Dependencies**

   Once you have Node.js installed, navigate to the `frontend` directory of the project and run:

   ```bash
   cd frontend
   npm install 
   ```

   This will install all the necessary dependencies listed in the `package.json` file.
   
   Make sure that the `package.json` file includes all the necessary dependencies for the project. If any of these are missing, you can add them by running `npm install <package-name>`.
  
   Here’s an example of the core dependencies that should be included:
  
   ```bash
    npm install axios
    npm install react
    npm install react-dom
    npm install react-router-dom
    npm install three
    npm install react-password-strength-bar
    npm install react-bootstrap
    npm install react-redux
    npm install @reduxjs/toolkit
   ```
  
    Make sure to update the versions according to your project needs.


4. **Install TAILWIND CSS**

    ```bash
    npm install -D tailwindcss
    npx tailwindcss init
    
   ```

6. **Start the Development Server**

   After installing the dependencies, start the development server with:

   ```bash
   
   npm run dev
   
   ```

   This will launch the React app in your browser, and it will reload automatically whenever you make changes to the code.


   

### Additional Notes

- Ensure that Node.js is properly installed by running `node -v` and `npm -v` to check their versions.
- If you encounter any issues with dependencies, try deleting the `node_modules` folder and rerunning `npm install`.

This setup will help your teammates quickly install and run the frontend part of the project.


## Project Structure

- `backend/` - Contains the Django backend source code.
- `frontend/` - Contains the React frontend source code.
- `venv/` - Python virtual environment for the backend.
- `.env` - Environment variables configuration file.


## Deployment

For deployment in production, it's recommended to use Docker or services like Heroku, AWS or render. Be sure to configure environment variables and database services properly.
this section is yet to be defined

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
```

This `README.md` file provides instructions for setting up your web application with React, Django, and PostgreSQL. Feel free to customize it based on the specific needs of your project.
