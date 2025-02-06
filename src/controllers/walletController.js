import Wallet from '../models/walletModel.js';
import { Op } from 'sequelize';

const getWallets = async (req, res) => {
  try {
    const wallets = await Wallet.findAll();
    res.status(200).json({wallets});
  } catch (error) {
    console.error('Error on getWallets:', error);
    res.status(500).json({ error: "Couldn't find any wallet." });
  }
};

const createWallet = async (req, res) => {
  try {
    const { name, address, emoji, tag } = req.body;
    const wallet = await Wallet.create({ name, address, emoji, tag, favorite: false });
    res.status(201).json(wallet);
  } catch (error) {
    res.status(500).json({ error: "Couldn't create wallet." });
  }
};

const updateWallet = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
    if(!id) return res.status(400).json({ error: "Invalid wallet id." });

    const wallet = await Wallet.findByPk(id);
    if (!wallet) return res.status(404).json({ error: "Wallet not found." });

    const updatedWallet = await wallet.update(req.body);
    const { name, address, emoji, tag } = updatedWallet;
    return res.status(200).json(updatedWallet);
  } catch (error) {
    res.status(500).json({ error: "Couldn't update wallet." });
  }
};

const deleteWallet = async (req, res) => {
  try{
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
    if(!id) return res.status(400).json({ error: "Invalid wallet id." });

    const wallet = await Wallet.findByPk(id);
    if (!wallet) return res.status(404).json({ error: "Wallet not found." });

    await wallet.destroy();
    res.status(200).json({ message: "Wallet removed." });
  } catch (error) {
    res.status(500).json({ error: "Couldn't delete wallet." });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
    if(!id) return res.status(400).json({ error: "Invalid wallet id." });

    const wallet = await Wallet.findByPk(id);
    if (!wallet) return res.status(404).json({ error: "Wallet not found." });

    wallet.favorite = !wallet.favorite;
    await wallet.save();
    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ error: "Couldn't toggle favorite." });
  }
};

export default {
  getWallets,
  createWallet,
  updateWallet,
  deleteWallet,
  toggleFavorite,
};
