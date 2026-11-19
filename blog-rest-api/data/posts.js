// In-memory sample data. Posts reset when the server restarts.
const posts = [
  {
    id: "1001",
    title: "Getting Started with Web Development",
    content: "Web development begins with learning HTML, CSS, and JavaScript.",
    author: "Demo Author",
    category: "Technology",
    createdAt: "2026-01-10T09:00:00.000Z"
  },
  {
    id: "1002",
    title: "Simple Ways to Stay Productive",
    content: "Breaking large tasks into smaller steps can make work easier to manage.",
    author: "Demo Writer",
    category: "Lifestyle",
    createdAt: "2026-01-12T10:30:00.000Z"
  }
];

module.exports = { posts };