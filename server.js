const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(cors())

app.get('/repos', async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/users/freeCodeCamp/repos')
        const repos = response.data

        const filteredRepos = repos.filter(repo => !repo.fork && repo.forks > 5)

        res.status(200).json(filteredRepos)
    }
    catch {
        console.error(error);
        res.status(500).json({ error: 'An error occurred.' });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});