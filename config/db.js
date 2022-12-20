import mongoose from "mongoose";
import Aluno from "../models/Aluno.js";
import GrupoMuscular from "../models/GrupoMuscular.js";
import Instrutor from "../models/Instrutor.js";
import bcrypt from "bcryptjs";

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_LOCAL);
    } catch (error) {
        throw error;
    }
};

const populateDatabase = async () => {
    const alunos = [
        {
            nome: "João",
            dataNascimento: new Date(2000, 1, 1),
            cpf: "11111111111",
            sexo: "M",
            telefone: "28999998888",
            email: "joao@email.com",
            senha: await bcrypt.hash("123456", 10),
            ativo: true,
        },
        {
            nome: "Maria",
            dataNascimento: new Date(1990, 1, 1),
            cpf: "22222222222",
            sexo: "F",
            telefone: "28999997777",
            email: "maria@email.com",
            senha: await bcrypt.hash("123456", 10),
            ativo: true,
        },
        {
            nome: "José",
            dataNascimento: new Date(1985, 1, 1),
            cpf: "33333333333",
            sexo: "M",
            telefone: "28999996666",
            email: "jose@email.com",
            senha: await bcrypt.hash("123456", 10),
            ativo: false,
        },
    ];

    const instrutores = [
        {
            nome: "Lucas",
            dataNascimento: new Date(2000, 1, 1),
            cpf: "44444444444",
            sexo: "M",
            telefone: "28999998888",
            email: "lucas@email.com",
            senha: await bcrypt.hash("123456", 10),
            ativo: true,
        },
        {
            nome: "Madalena",
            dataNascimento: new Date(1990, 1, 1),
            cpf: "55555555555",
            sexo: "F",
            telefone: "28999997777",
            email: "madalena@email.com",
            senha: await bcrypt.hash("123456", 10),
            ativo: true,
        },
        {
            nome: "Judas",
            dataNascimento: new Date(1985, 1, 1),
            cpf: "77777777777",
            sexo: "M",
            telefone: "28999996666",
            email: "judas@email.com",
            senha: await bcrypt.hash("123456", 10),
            ativo: false,
        },
    ];

    const gruposMusculares = [
        {
            nome: "Toráx"
        },
        {
            nome: "Abdômen"
        },
        {
            nome: "Membros Superiores"
        },
        {
            nome: "Membros Inferiores"
        },
        {
            nome: "Cabeça e Pescoço"
        },
    ];

    // await Aluno.deleteMany({});
    // console.log("Alunos deletados com sucesso.");
    if ((await Aluno.countDocuments({})) === 0) {
        await Aluno.insertMany(alunos);
        // await GrupoMuscular.insertMany(gruposMusculares);
        // await Instrutor.insertMany(instrutores);
        console.log("Banco de dados iniciado com sucesso.");
    }
    if ((await GrupoMuscular.countDocuments({})) === 0) {
        await GrupoMuscular.insertMany(gruposMusculares);
        console.log("Grupos Musculares inseridos com sucesso.");
    }
    if ((await Instrutor.countDocuments({})) === 0) {
        await Instrutor.insertMany(instrutores);
        console.log("Instrutores inseridos com sucesso.");
    }
};

mongoose.connection.on("disconnected", async () => {
    console.log("Desconectado do MongoDB.");
});

mongoose.connection.on("connected", async () => {
    await populateDatabase();
    console.log("Conectado ao MongoDB.");
});

mongoose.connection.on("error", async (error) => {
    console.log(`Erro no MongoDB:\n${error}`);
});

export default connectDatabase;
