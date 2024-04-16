const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//Génerer un refresh token
const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '3d' }); 
  };
  
// Se connecter
exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Trouver l'utilisateur dans la base de données
      const user = await User.findOne({ username });
  
      // Vérifier si l'utilisateur existe
      if (!user) {
        return res.status(401).json({ error: 'Invalid Username ' });
      }
  
      // Vérifier le mot de passe
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Générer un token JWT avec la clé secrète d'accès
      const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });

      // Générer un refresh token
        const refreshToken = generateRefreshToken(user._id);
  
      res.status(200).json({ 
        message: "Connexion réussie!",
        accessToken, 
        refreshToken
      });
    } catch (error) {
      console.error('User authentication error :', error);
      res.status(500).json({ error: 'User authentication error' });
    }
  };


  exports.register = async (req, res) => {
    try {
      console.log("received");
      // Vérifier si l'utilisateur existe déjà
      let user = await User.findOne({ username: req.body.username });
      if (user) {
        return res.status(400).json({ message: "User already exist." });
      }
  
      // Hacher le mot de passe avant de l'enregistrer dans la base de données
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      // Créer un nouvel utilisateur
      user = new User({
        username: req.body.username,
        password: hashedPassword
      });
  
      // Enregistrer l'utilisateur dans la base de données
      await user.save();
  
      res.status(201).json({ message: "User created succesfully!" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Erreur du serveur." });
    }
  };