# TinyUrl Service

## Overview
TinyUrl is a URL shortening service designed for business users to create, manage, and track shortened URLs for their landing pages, websites, and web files. It offers a convenient way to generate shorter links, track user engagement, and analyze the effectiveness of different advertising channels.

## Features
- **URL Shortening**: Generate short, user-friendly URLs from long web addresses.
- **Redirection**: Automatically redirect users from the shortened URL to the original URL.
- **Click Tracking**: Monitor the number of clicks on each shortened URL to assess link performance.
- **Source Targeting**: Identify and track the source of each click by appending a target parameter to the URL.

## Development
The project is developed in Node.js with MongoDB as the database, following Agile methodology. The service includes:
1. **Base API**: CRUD operations for users and links.
2. **Tracking**: Redirection and click tracking mechanisms.
3. **Targeting**: Source tracking for analyzing advertising channel performance.
