


https://github.com/user-attachments/assets/32e67890-2c73-42aa-a641-d8fc00f3ebeb



# NetWrite 📝 | Real-Time Collaborative Notes

A high-performance, full-stack MERN application designed for real-time note-taking and instant synchronization across multiple clients. Built with a focus on low-latency updates and optimized search functionality.

---

##  Key Technical Features

* **Bi-Directional Real-Time Sync**: Utilizes **Socket.io** to broadcast updates (creations/deletions) to all connected clients instantly without page refreshes.
* **Optimized Search (Debouncing)**: Implemented a custom 500ms debounce mechanism on the frontend to minimize redundant API calls and reduce database overhead.
* **Partial Match Search**: Backend leverages **MongoDB Regex ($regex)** with case-insensitive options for a seamless "search-as-you-type" experience.
* **State-Driven UI**: Built with **React hooks** (`useEffect`, `useState`) to ensure the UI stays perfectly in sync with the backend event bus.
* **RESTful Architecture**: Clean separation of concerns with dedicated Express routes and Mongoose schemas.

---

##  Tech Stack

**Frontend:** React.js, Vite, CSS3 (Modern Flex/Grid)  
**Backend:** Node.js, Express.js, Socket.io  
**Database:** MongoDB Atlas (Mongoose ODM)  
**Tools:** Dotenv (Environment Security), CORS, Nodemon

---

##  Project Structure

```text
├── backend/
│   ├── models/          # Mongoose Schema (BSON data structure)
│   ├── routes/          # Express API endpoints & Socket.io emitters
│   ├── .env             # Environment variables (Database URI, Port)
│   └── server.js        # Entry point: HTTP & WebSocket Hybrid Server
└── frontend/
    ├── src/
    │   ├── components/  # Modular UI (SearchBar, NoteForm, etc.)
    │   ├── App.jsx      # Global State & Socket listeners
    │   └── index.css    # Professional Design System
    └── main.jsx         # React DOM Initialization
