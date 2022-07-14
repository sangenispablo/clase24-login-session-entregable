const { Router } = require("express");

// importo el controlador para todas estas rutas
const webController = require("../controllers/webController");

// creo la instancia de Router
const router = Router();

// mis endpoints
router.get("/", webController.home);
router.get("/login", webController.getLogin);
router.post("/login", webController.postLogin);
router.get("/logout", webController.logout);
router.get("/currentUser", webController.currentUser);

module.exports = router;
