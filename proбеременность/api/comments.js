import fs from 'fs';
import path from 'path';

const commentsPath = path.join(process.cwd(), 'data', 'comments.json');

export default function handler(req, res) {
    // Разрешаем CORS для разработки
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    
    if (req.method === 'GET') {
        // Отдаём все комментарии
        const comments = fs.readFileSync(commentsPath, 'utf8');
        res.status(200).json(JSON.parse(comments));
    } 
    else if (req.method === 'POST') {
        // Добавляем новый комментарий
        const newComment = req.body;
        const currentComments = JSON.parse(fs.readFileSync(commentsPath, 'utf8'));
        currentComments.push(newComment);
        fs.writeFileSync(commentsPath, JSON.stringify(currentComments, null, 2));
        res.status(200).json({ status: 'ok' });
    }
    else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}