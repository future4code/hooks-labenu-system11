import express, { Request, Response } from 'express'
import cors from 'cors'
import knex from 'knex'
import dotenv from 'dotenv'


dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

enum TIPO_TURMA {
    INTEGRAL = "integral",
    NOTURNO = 'noturno'
}

enum ESPECIALIDADE {
    REACT = 1,
    REDUX = 2,
    CSS = 3,
    TESTES = 4,
    TYPESCRIPT = 5,
    POO = 6,
    BACKEND = 7
}

type turmaInput = {
    id: number,
    nome: string,
    data_inicio: string,
    data_fim: string,
    modulo: number,
    tipo: TIPO_TURMA
}

type docenteInput = {
    id: number,
    nome: string,
    email: string,
    data_nasc: string,
    especialidades: ESPECIALIDADE[],
    turma_id: number
}

type estudanteInput = {
    id: number,
    nome: string,
    email: string,
    data_nasc: string,
    hobbies: string[],
    turma_id: number
}

type turmaEstudanteInput = {
     estudante_id: number,
     turma_id: number
}

type turmaDocenteInput = {
     docente_id: number,
     turma_id: number
}

app.post("/turma", async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const input: turmaInput = {
            id: req.body.id,
            nome: req.body.nome,
            data_inicio: req.body.data_inicio,
            data_fim: req.body.data_fim,
            modulo: 0,
            tipo: req.body.tipo
        }

        if (!input.id || !input.nome || !input.data_inicio || !input.data_fim || !input.tipo) {
            errorCode = 422
            throw new Error("Todos os campos precisam ser preenchidos corretamente");
        }

        if (input.tipo !== TIPO_TURMA.INTEGRAL && input.tipo !== TIPO_TURMA.NOTURNO) {
            errorCode = 422
            throw new Error("Preencha 'integral' ou 'noturno'");
        }

        if (input.tipo === TIPO_TURMA.NOTURNO) {
            input.nome = input.nome += "-na-night"
        }

        await connection.raw(`
        INSERT INTO TURMA (id, nome, data_inicio, data_fim, modulo)
        VALUES(
            ${input.id},
            "${input.nome}",
            "${input.data_inicio}",
            "${input.data_fim}",
            ${input.modulo}

        );
        `)
        res.status(201).send({ message: "Turma criada" })
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
})

app.post("/estudante", async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const input: estudanteInput = {
            id: req.body.id,
            nome: req.body.nome,
            email: req.body.email,
            data_nasc: req.body.data_nasc,
            hobbies: req.body.hobbies,
            turma_id: req.body.turma_id
        }

        if (!input.id || !input.nome || !input.email || !input.turma_id || !input.data_nasc || input.hobbies.length < 1) {
            errorCode = 422
            throw new Error("Preencha todos os campos corretamente");
        }

        await connection.raw(`
       INSERT INTO ESTUDANTE(id, nome, email, data_nasc, turma_id)
       VALUES(
        ${input.id},
        "${input.nome}",
        "${input.email}",
        "${input.data_nasc}",
        ${input.turma_id}
       );
       `)

        for (let hobby of input.hobbies) {
            const idPassaTempo = Math.floor(Math.random() * 1000000)
            await connection.raw(`
        INSERT INTO PASSATEMPO(id, nome)
        VALUES(
            ${idPassaTempo},
            "${hobby}"
        )
        `)
            await connection.raw(`
        INSERT INTO ESTUDANTE_PASSATEMPO(estudante_id, passatempo_id)
        VALUES(
            ${input.id},
            ${idPassaTempo}
        )
        `)
        }

        res.status(201).send({ message: "estudante criado!" })

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
})

app.post("/docente", async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const input: docenteInput = {
            id: req.body.id,
            nome: req.body.nome,
            email: req.body.email,
            data_nasc: req.body.data_nasc,
            especialidades: req.body.especialidades,
            turma_id: req.body.turma_id
        }

        if (!input.id || !input.nome || !input.email || !input.turma_id || !input.data_nasc || input.especialidades.length < 1) {
            errorCode = 422
            throw new Error("Preencha todos os campos corretamente");
        }

        await connection.raw(`
       INSERT INTO DOCENTE(id, nome, email, data_nasc, turma_id)
       VALUES(
        ${input.id},
        "${input.nome}",
        "${input.email}",
        "${input.data_nasc}",
        ${input.turma_id}
       );
       `)

        for (let especialidade of input.especialidades) {
            await connection.raw(`
        INSERT INTO DOCENTE_ESPECIALIDADE (docente_id, especialidade_id)
        VALUES(
            ${input.id},
            ${ESPECIALIDADE[especialidade]}
        )
        `)

        }

        res.status(201).send({ message: "docente criado!" })

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
    })

app.put("/estudante",async (req:Request,res: Response)=> {
    let errorCode = 400
    try {
        const input: turmaEstudanteInput = {
            estudante_id: req.body.estudante_id,
            turma_id: req.body.turma_id
        }

        await connection.raw(`
        UPDATE ESTUDANTE
        SET turma_id = ${input.turma_id}
        WHERE id = ${input.estudante_id}
        `)

        res.status(200).send({message: "estudante atualizado na turma"})
    } catch (error) {
    res.status(errorCode).send({message: error.message})
    }

})

app.put("/docente",async (req:Request,res: Response)=> {
    let errorCode = 400
    try {
        const input: turmaDocenteInput = {
            docente_id: req.body.docente_id,
            turma_id: req.body.turma_id
        }

        await connection.raw(`
        UPDATE DOCENTE
        SET turma_id = ${input.turma_id}
        WHERE id = ${input.docente_id}
        `)

        res.status(200).send({message: "docente atualizado na turma"})
    } catch (error) {
    res.status(errorCode).send({message: error.message})
    }
})

app.get("/estudante/:id",async(req:Request,res:Response)=> {
  let errorCode = 400
  try {
    const id = req.params.id


    const result = await connection.raw(`
    SELECT ROUND(DATEDIFF("2021-01-01",data_nasc)/365) as idade
    FROM ESTUDANTE
    WHERE id = ${id}  
    `)
    
    res.status(200).send({estudante: result[0][0]})
  } catch (error) {
    
  }
})


const connection = knex({ // Estabelece conexão com o banco
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        multipleStatements: true
    }
})


app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});