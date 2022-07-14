const { request, response } = require("express");

const Usuario = require("../models/Usuario");

const pathPublic = process.cwd() + "/src/public/";

const home = async (req = request, res = response) => {
  try {
    if (!req.session.user) {
      res.redirect("/login");
    } else {
      res.sendFile(pathPublic + "home.html");
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const getLogin = async (req = request, res = response) => {
  try {
    res.sendFile(pathPublic + "login.html");
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const postLogin = async (req = request, res = response) => {
  try {
    const { username } = req.body;
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.redirect("/");
    }
    req.session.user = usuario;
    res.redirect("/");
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const logout = async (req = request, res = response) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        res.redirect("/");
      });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

const currentUser = async (req = request, res = response) => {
  try {
    res.send(req.session.user);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "ERROR", data: { error: error?.message || error } });
  }
};

module.exports = {
  getLogin,
  postLogin,
  logout,
  home,
  currentUser,
};
