from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Requests

# Load database credentials from environment variables (Recommended for security)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://your_user:your_password@db.your_supabase_url.com:5432/postgres")

# Function to connect to PostgreSQL
def get_db_connection():
    try:
        conn = psycopg2.connect(DATABASE_URL, sslmode="require")  # Use SSL for Supabase
        return conn
    except Exception as e:
        print(f"❌ Database connection error: {e}")
        return None

# Create table if it doesn't exist
def create_table():
    conn = get_db_connection()
    if conn:
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS subscribers (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL
            );
        """)
        conn.commit()
        cur.close()
        conn.close()
        print("✅ Table 'subscribers' is ready.")
    else:
        print("❌ Failed to connect to the database.")

# Run table creation on startup
create_table()

@app.route('/submit-email', methods=['POST'])
def receive_email():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"error": "No email provided"}), 400

    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"error": "Database connection failed"}), 500

        cur = conn.cursor()
        cur.execute("INSERT INTO subscribers (email) VALUES (%s) ON CONFLICT DO NOTHING", (email,))
        conn.commit()

        cur.close()
        conn.close()

        return jsonify({"message": "Subscription successful", "email": email}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
