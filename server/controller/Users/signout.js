module.exports = {
    post: async (req, res) => {
        delete req.headers['authorization'];
        // console.log('header!!!', req.headers);
        
        return res.status(205).json({ message: 'successfully signed out!' })
    }
}