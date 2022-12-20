import TipoExercicio from "../models/TipoExercicio.js";
import bcrypt from "bcryptjs";

export const createTipoExercicio = async (req, res, next) => {
    const tipoExercicio = new TipoExercicio(req.body);
    try {
        let salt = await bcrypt.genSalt(10);
        let hashSenha = await bcrypt.hash(tipoExercicio.senha, salt);
        tipoExercicio.senha = hashSenha;
        const createdTipoExercicio = await tipoExercicio.save();
        res.status(201).json(createdTipoExercicio);
    } catch (error) {
        next(error);
    }
};

export const updateTipoExercicio = async (req, res, next) => {
    try {
        const updatedTipoExercicio = await TipoExercicio.findByIdAndUpdate(req.params.id, {
            $set:
                req.body
        }, { new: true });
        res.status(200).json(updatedTipoExercicio);
    } catch (error) {
        next(error);
    }
};

export const deleteTipoExercicio = async (req, res, next) => {
    try {
        await TipoExercicio.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "TipoExercicio excluído com sucesso." });
    } catch (error) {
        next(error);
    }
};

export const getTipoExercicio = async (req, res, next) => {
    try {
        const tipoExercicio = await TipoExercicio.findById(req.params.id);
        res.status(200).json(tipoExercicio);
    } catch (error) {
        next(error);
    }
};

export const getTipoExercicios = async (req, res, next) => {
    try {
        const tipoExercicios = await TipoExercicio.find();
        res.status(200).json(tipoExercicios);
    } catch (error) {
        next(error);
    }
};