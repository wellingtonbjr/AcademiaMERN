import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDatabase from "./config/db.js";
import { errorHandling } from "./utils/error.js";

import routeAlunos from "./routes/alunoRoutes.js";
import routeInstrutores from "./routes/instrutorRoutes.js";
import routeGruposMusculares from "./routes/grupoMuscularRoutes.js";
import routeTiposExercicios from "./routes/tipoExercicioRoutes.js";
import routeFichas from "./routes/fichaRoutes.js";
import routeAuth from "./routes/authRoutes.js";
import { verificarToken } from "./utils/verificarToken.js";

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(errorHandling);

app.use("/api/auth", routeAuth);
app.use("/api/alunos", verificarToken, routeAlunos);
app.use("/api/instrutores", verificarToken, routeInstrutores);
app.use("/api/gruposmusculares", verificarToken, routeGruposMusculares);
app.use("/api/tiposexercicios", verificarToken, routeTiposExercicios);
app.use("/api/fichas", verificarToken, routeFichas);

app.listen(8080, () => {
    connectDatabase();
    console.log("Servidor rodando na porta 8080.");
});



// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import connectDatabase from "./config/db.js";
// import routeAlunos from "./routes/alunoRoutes.js";
// import routeAuth from "./routes/authRoutes.js";
// import { errorHandling } from "./utils/error.js";
// import cors from "cors";
// import { verificarToken } from "./utils/verificarToken.js";

// const app = express();
// dotenv.config();

// // const corsOptions = {
// //     credentials: true,
// //     origin: "http://localhost:3000",
// //     allowedHeaders: ["Content-Type", "Authorization"],
// // };

// app.use(cors());
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(errorHandling);
// app.use("/api/alunos", verificarToken, routeAlunos);
// app.use("/api/auth", routeAuth);

// app.listen(8080, () => {
//     connectDatabase();
//     console.log("Servidor rodando na porta 8080.");
// });
