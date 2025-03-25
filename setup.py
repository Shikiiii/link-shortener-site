import os
import subprocess
import sys

# Step 1: Install Required Dependencies for Script
def install_bootstrap_dependencies():
    """Ensure that 'psycopg2-binary' and 'python-dotenv' are installed before running the script."""
    print("Installing required dependencies for setup script...")
    subprocess.run([sys.executable, "-m", "pip", "install", "psycopg2-binary", "python-dotenv"], check=True)

# Install dependencies before importing them
install_bootstrap_dependencies()

# Now that dependencies are installed, we can import them
import psycopg2
from dotenv import load_dotenv

def check_command(command):
    """Run a shell command and return its output or None if it fails."""
    try:
        return subprocess.check_output(command, shell=True, text=True).strip()
    except subprocess.CalledProcessError:
        return None

def prompt_user():
    """Prompt the user to confirm before proceeding."""
    print("Please make sure that:")
    print("- Python 3.11 (or similar) installed")
    print("- NPM 10.2.3 (or similar) installed")
    print("- PostgreSQL installed and running")
    print("- .env and frontend/.env.local are setup")

    if not os.path.exists(".env"):
        print("⚠️  Missing .env file in the project root!")
    
    if not os.path.exists("frontend/.env.local"):
        print("⚠️  Missing .env.local file in frontend/!")

    response = input("Do you want to continue? (yes/no): ").strip().lower()
    return response == "yes"

def install_python_dependencies():
    """Install all Python dependencies from requirements.txt."""
    print("Installing all Python dependencies...")
    subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], check=True)

def install_npm_dependencies():
    """Change to frontend directory and install NPM dependencies."""
    frontend_dir = "frontend"
    if os.path.isdir(frontend_dir):
        print(f"Changing to frontend directory: {frontend_dir}")
        os.chdir(frontend_dir)
        print("Installing NPM dependencies...")
        subprocess.run(["npm", "install"], check=True)
        os.chdir("..")  # Return to root directory
    else:
        print(f"⚠️  Frontend directory '{frontend_dir}' not found, skipping NPM installation.")

def create_postgres_db():
    """Create PostgreSQL database using credentials from .env."""
    print("Creating PostgreSQL database...")

    load_dotenv()  # Load environment variables from .env file
    db_name = os.getenv("DB_NAME", "link_shortener_db")
    db_user = os.getenv("DB_USER", "postgres")
    db_password = os.getenv("DB_PASSWORD", "admin")
    db_host = os.getenv("DB_HOST", "localhost")
    db_port = os.getenv("DB_PORT", "5432")

    try:
        # Connect to PostgreSQL
        conn = psycopg2.connect(
            dbname="postgres",  # Connect to the default 'postgres' database first
            user=db_user,
            password=db_password,
            host=db_host,
            port=db_port
        )
        conn.autocommit = True  # Enable autocommit to create a database
        cur = conn.cursor()

        # Check if database already exists
        cur.execute("SELECT 1 FROM pg_database WHERE datname = %s;", (db_name,))
        exists = cur.fetchone()

        if exists:
            print(f"Database '{db_name}' already exists. ✅")
        else:
            # Create the database
            cur.execute(f"CREATE DATABASE {db_name};")
            print(f"Database '{db_name}' created successfully! 🚀")

        # Close connection
        cur.close()
        conn.close()
    
    except psycopg2.Error as e:
        print(f"⚠️  Error creating database: {e}")

if __name__ == "__main__":
    npm_version = check_command("npm -v")
    python_version = sys.version.split()[0]

    print(f"Detected Python version: {python_version}")
    print(f"Detected NPM version: {npm_version if npm_version else 'Not installed'}")

    if not prompt_user():
        print("Setup aborted.")
        sys.exit(1)

    install_python_dependencies()
    install_npm_dependencies()
    create_postgres_db()

    print("✅ Setup completed successfully! 🚀")
    print("▶️ Now run the backend: python manage.py runserver")
    print("▶️ And run the frontend: cd frontend && npm run dev")
