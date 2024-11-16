## Contact Management task

## Installation

Follow these steps to install and setup the project:

1. Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/VishalChaudhary01/contact-management-task.git
```

2. Navigate to the project directory:

```bash
cd contact-management-task
```

3. Backend setup:

    - Navigate to backend folder
      ```bash
        cd backend
      ```

    - Install the backend dependencies:
      ```bash
        npm install
      ```

    - Copy .env.example to .env
      ```bash
        cp .env.example .env
      ```

    - Replace DATABASE_URL with your postgres database url:

    - Create dummy contact information:
      ```bash
        npx prisma db seed
      ```
      
    - Run backend
      ```bash
        npm run dev
      ```

3. Frontend setup:

    - Navigate to frontend folder:
      ```bash
        cd frontend
      ```

    - Install the frontend dependencies:
      ```bash
        npm install
      ```

    - Copy .env.example to .env:
      ```bash
        cp .env.example .env
      ```
      
    - Run frontend:
      ```bash
        npm run dev
      ```
