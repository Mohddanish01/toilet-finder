# Toilet Finder 🚽

A location-based public toilet finder and cleanliness rating platform.

## Overview

Toilet Finder helps users locate nearby public toilets, view ratings and reviews, and contribute to improving public sanitation through community-driven feedback.

## Features Implemented

### Authentication & Security

* User Signup
* User Login
* JWT Authentication
* Protected Routes
* Password Hashing using bcryptjs

### Toilet Management

* Add New Toilet
* Get All Toilets
* Get Toilet By ID
* Find Nearby Toilets using Geo Queries
* Protected Toilet Creation
* Track Toilet Creator

### Review System

* Add Review
* Get Reviews by Toilet
* Update Review
* Delete Review
* Prevent Duplicate Reviews
* Review Ownership Verification

### Rating System

* Automatic Average Rating Calculation
* Automatic Review Count Tracking
* Centralized Rating Update Helper

### Validation

* Toilet Request Validation
* Review Request Validation
* Proper Error Responses

### Database

* MongoDB
* Mongoose ODM
* GeoJSON Location Storage
* 2dsphere Index for Location Queries

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT (jsonwebtoken)
* bcryptjs

### Validation

* express-validator

### Testing

* Postman

## API Endpoints

### Authentication

* POST /api/auth/signup
* POST /api/auth/login
* GET /api/auth/me

### Toilets

* POST /api/toilets
* GET /api/toilets
* GET /api/toilets/nearby
* GET /api/toilets/:id

### Reviews

* POST /api/reviews
* GET /api/reviews/:toiletId
* PUT /api/reviews/:id
* DELETE /api/reviews/:id

## Project Structure

backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── validations/
└── server.js

## Future Features

* React Frontend
* Progressive Web App (PWA)
* Interactive Maps
* Toilet Demand Heatmap
* Admin Dashboard
* Role-Based Authorization
* Image Uploads
* Complaint Management System

## Author

Mohd Danish
