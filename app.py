import os
import psycopg2
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# ✅ Allow only Netlify frontend for better security
CORS(app, resources={r"/*": {"origins": "https://leftiesinnovative.netlify.app"}})

# ✅ Use External DATABASE_URL (since Netlify is external to Render)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://leftsight_db_user:ATtiJ5lQR9oSFdVQnWriIn330K6R8DEQ@dpg-cuhrvp5umphs73a69b90-a.oregon-postgres.render.com/leftsight_db")

# ✅ Function to connect to PostgreSQL
def get_db_connection():
    return psycopg2.connect(DATABASE_URL, sslmode="require")

# ✅ Create 'subscribers' table if it doesn't exist
def create_table():
    conn = get_db_connection()
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

create_table()  # Run table creation on startup

# ✅ API Route to Receive and Store Emails
@app.route('/submit-email', methods=['POST'])
def receive_email():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"error": "No email provided"}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO subscribers (email) VALUES (%s) ON CONFLICT DO NOTHING", (email,))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Subscription successful", "email": email}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ Run Flask App on Port 5000
if __name__ == '__main__':
    app.run(debug=True, port=5000)
