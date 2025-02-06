import Wallet from '../models/walletModel.js';
import { Op } from 'sequelize';

const getWallets = async (req, res) => {
  try {
    const wallets = await Wallet.findAll();
    res.status(200).json(wallets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export default {
  getWallets,
};
