import walletRoutes from './walletRoutes.js';

function Routes(app) {
    app.use('/wallets', walletRoutes);
}

export default Routes;
