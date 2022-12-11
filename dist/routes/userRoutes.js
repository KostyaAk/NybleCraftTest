"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var router = (0, express_1.Router)();
router.post('/signup', userController_1.signup);
router.post('/login', userController_1.login);
router.get('/getall', userController_1.getAll);
router.post('/create', userController_1.createUser);
router.post('/image/:id', userController_1.image);
router.post('/pdf', userController_1.pdf);
router.get('/getone/:id', userController_1.getOne);
router.put('/update/:id', userController_1.update);
router["delete"]('/delete/:id', userController_1.deleteUser);
exports["default"] = router;
//# sourceMappingURL=userRoutes.js.map