# Social Anti-Fake News System

## Group Information
- **Group Name**: FactCheckers
- **Members**:
  - Student ID: 20232050, Name: fuyilin
  - Student ID: 20232094, Name: wangyuhan
  - Student ID: 20232076, Name: yuantaixian

## Project Description
The Social Anti-Fake News System is a web application that leverages collective wisdom to identify and combat fake news. Users can submit news stories, view all submitted news, vote on whether news is fake or authentic, and provide comments with supporting evidence.

## Features
- **News List View**: Browse all news with filtering options (All News, Fake News, Not Fake News)
- **Pagination**: Control the number of news items displayed per page
- **News Details**: View complete information about each news story
- **Voting System**: Vote whether news is fake or authentic
- **Comment Section**: Add comments with optional supporting images
- **Comment Pagination**: Navigate through comments with customizable page size
- **Real-time Updates**: See vote results and comments immediately

## Technologies Used
- **Frontend**: React.js with Vite
- **Routing**: React Router
- **Styling**: Bootstrap
- **Mock Data**: Local JavaScript data

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/fu202322050/social-anti-fake-news.git
   cd social-anti-fake-news
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Deployment
The application is deployed on Vercel. You can access it at: [https://social-anti-fake-news.vercel.app](https://social-anti-fake-news.vercel.app)

## Demo Video
A demonstration video explaining the features of the application is available at: [https://example.com/demo-video](https://example.com/demo-video)

## Project Structure
```
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── NewsList.jsx
│   │   └── NewsDetail.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.jsx
│   └── index.css
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

## License
This project is licensed under the MIT License.
