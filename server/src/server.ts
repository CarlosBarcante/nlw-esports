import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import { convertHourToMinutes } from './utils/convert-hour-to-minutes';
import { convertMinutesToHours } from './utils/convert-minutes-to-hours';

dotenv.config();

const app = express();

const prisma = new PrismaClient({
    log: ['query']
});

app.use(express.json());

app.use(cors());

app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });

    return res.json(games);
})

app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hoursStart: true,
            hoursEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hoursStart: convertMinutesToHours(ad.hoursStart),
            hoursEnd: convertMinutesToHours(ad.hoursEnd),
        }
    }));
})

app.get('/ads/:id/discord', async (req, res) => {
    const { id } = req.params;
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id,
        }
    })

    return res.json(ad);
})

app.post('/games/:id/ad', async (req, res) => {
    const { id } = req.params;
    const body: any = req.body;

    // Adicionar Validação Zod

    const ad = await prisma.ad.create({
        data: {
            gameId: id,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hoursStart: convertHourToMinutes(body.hoursStart),
            hoursEnd: convertHourToMinutes(body.hoursEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return res.status(201).json(ad);
})

app.listen(process.env.PORT);