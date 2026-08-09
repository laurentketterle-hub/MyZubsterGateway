// routes/chemistryRoutes.js
const express = require('express');
const router = express.Router();
const chemistry = require('../chemistry/chemistry-tokenization');

// Collection Endpoints
router.get('/elements', (req, res) => res.json(chemistry.elements));
router.get('/compounds', (req, res) => res.json(chemistry.compounds));
router.get('/molecules', (req, res) => res.json(chemistry.molecules));
router.get('/reactions', (req, res) => res.json(chemistry.reactions));
router.get('/materials', (req, res) => res.json(chemistry.materials));
router.get('/discoveries', (req, res) => res.json(chemistry.discoveries));
router.get('/nobelPrizes', (req, res) => res.json(chemistry.nobelPrizes));

// Stats & NFT Queries
router.get('/stats', (req, res) => res.json(chemistry.getStats()));
router.get('/nfts', (req, res) => res.json(chemistry.getAllNFTs()));
router.get('/nft/:nftId', (req, res) => {
  const result = chemistry.getNFT(req.params.nftId);
  if (!result.success) return res.status(404).json(result);
  res.json(result);
});

// Mint Action
router.post('/mint/:type/:id', (req, res) => {
  const { type, id } = req.params;
  const result = chemistry.mintNFT(type, id);
  if (!result.success) return res.status(400).json(result);
  res.status(201).json(result);
});

module.exports = router;
