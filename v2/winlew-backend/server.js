const express = require('express');
const app = express();
const tokenRoutes = require('./routes/token');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/token', tokenRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));