import GrupoMuscular from "../models/GrupoMuscular.js";
import bcrypt from "bcryptjs";

export const createGrupoMuscular = async (req, res, next) => {
    const grupoMuscular = new GrupoMuscular(req.body);
    try {
        let salt = await bcrypt.genSalt(10);
        let hashSenha = await bcrypt.hash(grupoMuscular.senha, salt);
        grupoMuscular.senha = hashSenha;
        const createdGrupoMuscular = await grupoMuscular.save();
        res.status(201).json(createdGrupoMuscular);
    } catch (error) {
        next(error);
    }
};

export const updateGrupoMuscular = async (req, res, next) => {
    try {
        const updatedGrupoMuscular = await GrupoMuscular.findByIdAndUpdate(req.params.id, {
            $set:
                req.body
        }, { new: true });
        res.status(200).json(updatedGrupoMuscular);
    } catch (error) {
        next(error);
    }
};

export const deleteGrupoMuscular = async (req, res, next) => {
    try {
        await GrupoMuscular.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "GrupoMuscular excluído com sucesso." });
    } catch (error) {
        next(error);
    }
};

export const getGrupoMuscular = async (req, res, next) => {
    try {
        const grupoMuscular = await GrupoMuscular.findById(req.params.id);
        res.status(200).json(grupoMuscular);
    } catch (error) {
        next(error);
    }
};

export const getGrupoMusculares = async (req, res, next) => {
    try {
        const grupoMusculares = await GrupoMuscular.find();
        res.status(200).json(grupoMusculares);
    } catch (error) {
        next(error);
    }
};