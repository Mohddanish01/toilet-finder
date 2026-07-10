# 🚻 PublicLoo

### Community-Powered Public Toilet Finder

PublicLoo is a modern community-powered web application that helps users discover nearby public toilets, contribute new toilet locations, and request toilets in underserved areas through interactive maps and community voting.

---

## 🌟 Features

### 🚽 Find Nearby Toilets
- Discover public toilets near your current location
- Interactive map powered by Leaflet
- Distance calculation from your location
- View toilet details and amenities
- Google Maps navigation support

### ➕ Add Public Toilets
- Add verified public toilet locations
- Select location from interactive map
- Upload multiple images
- Add facilities like:
  - Male
  - Female
  - Wheelchair Accessible
  - Drinking Water
  - Tissue Paper
- Opening hours
- Free / Paid information

### 🚧 Community Toilet Demands
- Request toilets in areas where none exist
- Duplicate demand detection within 100 meters
- Community voting system
- Demand statistics dashboard
- Delete your own demands
- Automatically navigate to an existing nearby demand if one already exists

### ⭐ Reviews & Ratings
- Add reviews
- Give ratings
- Average rating calculation
- Prevent duplicate reviews by the same user

### 👤 Authentication
- JWT Authentication
- Secure Login & Signup
- Protected Routes
- User Dashboard

### 🗺 Interactive Map
- Live location detection
- Marker clustering
- Current location marker
- Toilet markers
- Demand markers
- Popup information
- Auto-focus on selected demand
- Smooth map navigation

### 📊 Dashboard
- Total toilets added
- Total reviews
- Average ratings
- Manage your contributions

---

# 🛠 Tech Stack

## Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Leaflet
- Lucide React
- React Icons

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

## Maps & APIs
- OpenStreetMap
- Leaflet
- Nominatim Reverse Geocoding API

---

# ✨ Key Features Implemented

- JWT Authentication
- GeoSpatial Search
- GeoJSON Location Storage
- Nearby Toilet Search
- Reverse Geocoding
- Image Upload
- Community Voting
- Duplicate Demand Detection
- Interactive Maps
- Responsive Design
- Protected Routes
- Dashboard Analytics
- Reviews & Ratings
- Auto Map Navigation
- Location Persistence

---

# 📂 Project Structure

```
publicloo/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── utils/
│   └── assets/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Mohddanish01/toilet-finder.git
```

## Backend

```bash
cd backend
npm install
```

Create a `.env` file

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

Run backend

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 📍 How It Works

### Finding Toilets

```
User Location
      ↓
GeoSpatial Query
      ↓
Nearby Toilets
      ↓
Interactive Map
```

---

### Creating a Demand

```
Current Location
       ↓
Check Nearby Demands (100m)
       ↓
Already Exists?
     /        \
   Yes         No
   ↓            ↓
Navigate     Create Demand
to Existing
Demand
```

---

### Community Voting

```
User
 ↓
Vote
 ↓
Duplicate Vote Check
 ↓
Update Vote Count
```

---

# 📱 Screenshots

Add screenshots here.

Example:

```
Home Page

Dashboard

Map View

Toilet Details

Add Toilet

Add Demand

My Demands

Login

Signup
```

---

# 🔒 Security

- JWT Authentication
- Protected APIs
- User Authorization
- Duplicate Review Prevention
- Duplicate Vote Prevention
- Duplicate Demand Detection

---

# 💡 Future Improvements

- Toast Notifications
- AI-based Toilet Cleanliness Prediction
- Real-time Notifications
- Admin Dashboard
- Offline PWA Support
- Route Optimization
- Heatmap Visualization
- Public Toilet Availability Status

---

## 🌍 Vision

PublicLoo aims to make public sanitation more accessible by enabling communities to discover, contribute, and improve public toilet availability through collaborative mapping and real-time feedback.

# 👨‍💻 Author

**Mohd Danish**

GitHub:
https://github.com/Mohddanish01

---

# ⭐ If you found this project useful, consider giving it a Star.
